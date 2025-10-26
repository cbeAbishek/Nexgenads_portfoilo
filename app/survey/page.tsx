'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Briefcase, Palette, Building2, CheckCircle, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type SurveyFormState = Record<string, string | string[] | number | boolean | undefined>;

const getStringValue = (state: SurveyFormState, key: string) => {
  const value = state[key];
  return typeof value === 'string' ? value : '';
};

const getArrayValue = (state: SurveyFormState, key: string): string[] => {
  const value = state[key];
  return Array.isArray(value) ? (value as string[]) : [];
};

export default function SurveyPage() {
  const [activeTab, setActiveTab] = useState('advertiser');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  
  const [advertiserData, setAdvertiserData] = useState<SurveyFormState>({});
  const [mediatorData, setMediatorData] = useState<SurveyFormState>({});
  const [designerData, setDesignerData] = useState<SurveyFormState>({});
  const [adSpaceData, setAdSpaceData] = useState<SurveyFormState>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldSaveRecordingRef = useRef(true);

  const [isRecordingSupported, setIsRecordingSupported] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);

  useEffect(() => {
    const supported = typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
    setIsRecordingSupported(supported);

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
    };
  }, [audioPreviewUrl]);

  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

  const validateFileSize = (file: File | null) => {
    if (!file) return true;
    if (file.size <= MAX_FILE_SIZE_BYTES) return true;
    setSubmitMessage('Please choose files smaller than 5 MB.');
    return false;
  };

  const uploadFile = async (file: File, type: 'image' | 'audio') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch('/api/survey/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to upload file.');
    }

    const data = await response.json();
    return data.publicUrl as string;
  };

  const clearRecordingTimer = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  const stopActiveStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const releasePreviewUrl = () => {
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
      setAudioPreviewUrl(null);
    }
  };

  const resetUploadFields = () => {
    shouldSaveRecordingRef.current = true;
    setImageFile(null);
    setAudioFile(null);
    setRecordingDuration(0);
    setRecordingError(null);
    setIsRecording(false);

    if (imageInputRef.current) imageInputRef.current.value = '';
    if (audioInputRef.current) audioInputRef.current.value = '';

    releasePreviewUrl();
    clearRecordingTimer();

    if (isRecording && mediaRecorderRef.current) {
      try {
        shouldSaveRecordingRef.current = false;
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error('Audio recording stop error during reset:', error);
      }
    }

    stopActiveStream();
    audioChunksRef.current = [];
    mediaRecorderRef.current = null;
  };

  const formatDuration = (totalSeconds: number) => {
    const safeSeconds = Number.isFinite(totalSeconds) && totalSeconds > 0 ? totalSeconds : 0;
    const minutes = Math.floor(safeSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (safeSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleAudioFileInput = (file: File | null) => {
    if (isRecording) return;

    shouldSaveRecordingRef.current = true;
    clearRecordingTimer();
    stopActiveStream();
    audioChunksRef.current = [];
    mediaRecorderRef.current = null;
    setIsRecording(false);
    setRecordingDuration(0);

    releasePreviewUrl();

    if (!file) {
      setAudioFile(null);
      setRecordingError(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setAudioFile(file);
    setAudioPreviewUrl(objectUrl);
    setRecordingError(null);
  };

  const startRecording = async () => {
    if (!isRecordingSupported || isRecording) return;

    setSubmitMessage('');
    setRecordingError(null);
    shouldSaveRecordingRef.current = true;
    clearRecordingTimer();
    releasePreviewUrl();
    setAudioFile(null);
    if (audioInputRef.current) audioInputRef.current.value = '';

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      const options: MediaRecorderOptions = {};
      const preferredMime = 'audio/webm;codecs=opus';
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported?.(preferredMime)) {
        options.mimeType = preferredMime;
      }

      const recorder = options.mimeType ? new MediaRecorder(stream, options) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      const startTimestamp = Date.now();
  recordingIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
        setRecordingDuration(elapsed >= 0 ? elapsed : 0);
      }, 500);

      recorder.ondataavailable = (event) => {
        if (event.data?.size) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        setRecordingError('Recording error. Please try again.');
        shouldSaveRecordingRef.current = false;
        recorder.stop();
      };

      recorder.onstop = () => {
        clearRecordingTimer();
        setIsRecording(false);
        const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
        setRecordingDuration(elapsedSeconds >= 0 ? elapsedSeconds : 0);

        stopActiveStream();

        if (!shouldSaveRecordingRef.current || audioChunksRef.current.length === 0) {
          audioChunksRef.current = [];
          shouldSaveRecordingRef.current = true;
          releasePreviewUrl();
          setAudioFile(null);
          return;
        }

        const mimeType = recorder.mimeType || options.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        audioChunksRef.current = [];

        const extension = mimeType.includes('wav')
          ? 'wav'
          : mimeType.includes('ogg')
          ? 'ogg'
          : mimeType.includes('mpeg')
          ? 'mp3'
          : 'webm';
        const fileName = `survey-recording-${Date.now()}.${extension}`;
        const recordedFile = new File([blob], fileName, { type: mimeType });

        releasePreviewUrl();
        const objectUrl = URL.createObjectURL(blob);
        setAudioPreviewUrl(objectUrl);
        setAudioFile(recordedFile);
        setRecordingError(null);
        shouldSaveRecordingRef.current = true;
      };

      recorder.start();
      setRecordingDuration(0);
      setIsRecording(true);
    } catch (error) {
      console.error('Audio recording start error:', error);
      stopActiveStream();
      clearRecordingTimer();
      setIsRecording(false);
      setRecordingError('Unable to access the microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;

    try {
      shouldSaveRecordingRef.current = true;
      mediaRecorderRef.current.stop();
    } catch (error) {
      console.error('Audio recording stop error:', error);
      setRecordingError('Unable to stop recording. Please try again.');
    }
  };

  const discardRecording = () => {
    shouldSaveRecordingRef.current = false;
    clearRecordingTimer();

    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error('Audio recording discard error:', error);
      }
    }

    stopActiveStream();
    audioChunksRef.current = [];
    mediaRecorderRef.current = null;
    setIsRecording(false);
    setAudioFile(null);
    setRecordingDuration(0);
    setRecordingError(null);
    if (audioInputRef.current) audioInputRef.current.value = '';
    releasePreviewUrl();
    shouldSaveRecordingRef.current = true;
  };

  const handleSubmit = async (stakeholderType: string, responses: SurveyFormState) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate file sizes before starting uploads
      if (!validateFileSize(imageFile) || !validateFileSize(audioFile)) {
        setIsSubmitting(false);
        resetUploadFields();
        return;
      }

      const media: { imageUrl?: string; audioUrl?: string } = {};

      if (imageFile) {
        media.imageUrl = await uploadFile(imageFile, 'image');
      }

      if (audioFile) {
        media.audioUrl = await uploadFile(audioFile, 'audio');
      }

      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stakeholderType,
          responses,
          email,
          media,
        }),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your feedback! Your insights are valuable to us.');
        // Reset form
        if (stakeholderType === 'advertiser') setAdvertiserData({});
        else if (stakeholderType === 'mediator') setMediatorData({});
        else if (stakeholderType === 'designer') setDesignerData({});
        else if (stakeholderType === 'ad_space_owner') setAdSpaceData({});
        setEmail('');
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setSubmitMessage(error.message || 'An unexpected error occurred.');
      } else {
        setSubmitMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
      resetUploadFields();
    }
  };

  const renderMediaUploads = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="survey-image" className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4" /> Reference image (optional)
        </Label>
        <Input
          id="survey-image"
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={(event) => {
            const file = event.target.files?.[0] || null;
            if (file && file.size > MAX_FILE_SIZE_BYTES) {
              setSubmitMessage('Please choose files smaller than 5 MB.');
              event.target.value = '';
              return;
            }
            setSubmitMessage('');
            setImageFile(file);
          }}
          disabled={isSubmitting}
          className="bg-background/50 mt-2 cursor-pointer"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Upload mood boards, mockups, or reference photos (max 5 MB).
        </p>
      </div>

      <div>
        <Label htmlFor="survey-audio" className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4" /> Voice note (optional)
        </Label>
        <div className="mt-2 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={startRecording}
              disabled={!isRecordingSupported || isRecording || isSubmitting}
            >
              {isRecording ? 'Recording…' : 'Start recording'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={stopRecording}
              disabled={!isRecording || isSubmitting}
            >
              Stop
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={discardRecording}
              disabled={!isRecording && !audioFile && !audioPreviewUrl}
            >
              Discard
            </Button>
            <span className="text-sm text-muted-foreground">
              {isRecording ? `Recording time: ${formatDuration(recordingDuration)}` : audioPreviewUrl ? `Recorded audio ready (${formatDuration(recordingDuration)})` : 'Record a quick note'}
            </span>
          </div>

          {!isRecordingSupported && (
            <p className="text-xs text-muted-foreground">
              Recording isn&apos;t supported in this browser. You can still upload an audio file below.
            </p>
          )}

          <Input
            id="survey-audio"
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              if (file && file.size > MAX_FILE_SIZE_BYTES) {
                setSubmitMessage('Please choose files smaller than 5 MB.');
                event.target.value = '';
                return;
              }
              setSubmitMessage('');
              handleAudioFileInput(file);
            }}
            disabled={isSubmitting || isRecording}
            className="bg-background/50 cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            Drop a quick idea or feedback recording (max 5 MB). You can record directly or upload an existing audio file.
          </p>

          {audioPreviewUrl && (
            <div className="space-y-2 rounded-lg border border-border/40 bg-muted/20 p-3">
              <audio controls src={audioPreviewUrl} className="w-full" preload="metadata" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{recordingDuration ? `Length: ${formatDuration(recordingDuration)}` : 'Recorded clip ready'}</span>
                <Button type="button" variant="ghost" size="sm" onClick={discardRecording}>
                  Remove
                </Button>
              </div>
            </div>
          )}

          {recordingError && <p className="text-xs text-destructive">{recordingError}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-card/30">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Help Us <span className="text-gradient">Build Better</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your feedback shapes the future of NexGenAds. Take our survey and be part of the journey.
          </p>
        </div>
      </section>

      {/* Survey Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass-effect p-1 mb-8">
              <TabsTrigger value="advertiser" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Advertiser</span>
              </TabsTrigger>
              <TabsTrigger value="mediator" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Mediator</span>
              </TabsTrigger>
              <TabsTrigger value="designer" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Designer</span>
              </TabsTrigger>
              <TabsTrigger value="adspace" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Ad Space</span>
              </TabsTrigger>
            </TabsList>

            {/* Advertiser Survey */}
            <TabsContent value="advertiser">
              <div className="glass-effect-strong p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Advertiser Survey</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('advertiser', advertiserData); }} className="space-y-6">
                  <div>
                    <Label>Company Size</Label>
                    <Select onValueChange={(value) => setAdvertiserData({...advertiserData, companySize: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201+">201+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Monthly Advertising Budget</Label>
                    <Select onValueChange={(value) => setAdvertiserData({...advertiserData, budget: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<50k">Less than ₹50,000</SelectItem>
                        <SelectItem value="50k-2L">₹50,000 - ₹2,00,000</SelectItem>
                        <SelectItem value="2L-5L">₹2,00,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="5L+">More than ₹5,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Primary Advertising Channels (Select all that apply)</Label>
                    <div className="space-y-3 mt-3">
                      {['Digital (Social Media)', 'Print Media', 'Outdoor (Billboards, etc.)', 'TV/Radio', 'Events'].map((channel) => (
                        <div key={channel} className="flex items-center space-x-2">
                          <Checkbox
                            id={channel}
                            onCheckedChange={(checked) => {
                              const channels = getArrayValue(advertiserData, 'channels');
                              const isChecked = checked === true;
                              setAdvertiserData({
                                ...advertiserData,
                                channels: isChecked
                                  ? Array.from(new Set([...channels, channel]))
                                  : channels.filter((c) => c !== channel),
                              });
                            }}
                          />
                          <Label htmlFor={channel} className="cursor-pointer">{channel}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Biggest Challenge in Current Advertising</Label>
                    <Textarea
                      className="bg-background/50 mt-2"
                      rows={4}
                      placeholder="Share your main pain points..."
                      value={getStringValue(advertiserData, 'challenges')}
                      onChange={(e) => setAdvertiserData({ ...advertiserData, challenges: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      className="bg-background/50 mt-2"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {renderMediaUploads()}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Mediator Survey */}
            <TabsContent value="mediator">
              <div className="glass-effect-strong p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Mediator Survey</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('mediator', mediatorData); }} className="space-y-6">
                  <div>
                    <Label>Years of Experience</Label>
                    <Select onValueChange={(value) => setMediatorData({...mediatorData, experience: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5+">More than 5 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Average Deals Per Month</Label>
                    <Input
                      type="number"
                      className="bg-background/50 mt-2"
                      placeholder="Number of deals"
                      value={getStringValue(mediatorData, 'dealsPerMonth')}
                      onChange={(e) => setMediatorData({ ...mediatorData, dealsPerMonth: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Commission Range You Typically Earn</Label>
                    <Select onValueChange={(value) => setMediatorData({...mediatorData, commission: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<10%">Less than 10%</SelectItem>
                        <SelectItem value="10-15%">10-15%</SelectItem>
                        <SelectItem value="15-20%">15-20%</SelectItem>
                        <SelectItem value="20%+">More than 20%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>What features would help you close more deals?</Label>
                    <Textarea
                      className="bg-background/50 mt-2"
                      rows={4}
                      placeholder="Share your thoughts..."
                      value={getStringValue(mediatorData, 'desiredFeatures')}
                      onChange={(e) => setMediatorData({ ...mediatorData, desiredFeatures: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      className="bg-background/50 mt-2"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {renderMediaUploads()}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Designer Survey */}
            <TabsContent value="designer">
              <div className="glass-effect-strong p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Designer Survey</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('designer', designerData); }} className="space-y-6">
                  <div>
                    <Label>Design Specialization</Label>
                    <Select onValueChange={(value) => setDesignerData({...designerData, specialization: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="graphic">Graphic Design</SelectItem>
                        <SelectItem value="video">Video Production</SelectItem>
                        <SelectItem value="3d">3D/Animation</SelectItem>
                        <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                        <SelectItem value="illustration">Illustration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Years of Experience</Label>
                    <Input
                      type="number"
                      className="bg-background/50 mt-2"
                      placeholder="Years"
                      value={getStringValue(designerData, 'experience')}
                      onChange={(e) => setDesignerData({ ...designerData, experience: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Average Project Rate</Label>
                    <Select onValueChange={(value) => setDesignerData({...designerData, rate: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select rate range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<10k">Less than ₹10,000</SelectItem>
                        <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                        <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                        <SelectItem value="50k+">More than ₹50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>What challenges do you face finding advertising projects?</Label>
                    <Textarea
                      className="bg-background/50 mt-2"
                      rows={4}
                      placeholder="Share your challenges..."
                      value={getStringValue(designerData, 'challenges')}
                      onChange={(e) => setDesignerData({ ...designerData, challenges: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      className="bg-background/50 mt-2"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {renderMediaUploads()}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Ad Space Owner Survey */}
            <TabsContent value="adspace">
              <div className="glass-effect-strong p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Ad Space Owner Survey</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('ad_space_owner', adSpaceData); }} className="space-y-6">
                  <div>
                    <Label>Type of Ad Space</Label>
                    <Select onValueChange={(value) => setAdSpaceData({...adSpaceData, spaceType: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select space type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billboard">Billboard</SelectItem>
                        <SelectItem value="digital-screen">Digital Screen</SelectItem>
                        <SelectItem value="wall">Wall Space</SelectItem>
                        <SelectItem value="vehicle">Vehicle Advertising</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Number of Ad Spaces</Label>
                    <Input
                      type="number"
                      className="bg-background/50 mt-2"
                      placeholder="Count"
                      value={getStringValue(adSpaceData, 'spaceCount')}
                      onChange={(e) => setAdSpaceData({ ...adSpaceData, spaceCount: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Average Monthly Revenue Per Space</Label>
                    <Select onValueChange={(value) => setAdSpaceData({...adSpaceData, revenue: value})}>
                      <SelectTrigger className="bg-background/50 mt-2">
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<10k">Less than ₹10,000</SelectItem>
                        <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                        <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                        <SelectItem value="50k+">More than ₹50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Main challenges in monetizing your ad spaces?</Label>
                    <Textarea
                      className="bg-background/50 mt-2"
                      rows={4}
                      placeholder="Share your challenges..."
                      value={getStringValue(adSpaceData, 'challenges')}
                      onChange={(e) => setAdSpaceData({ ...adSpaceData, challenges: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      className="bg-background/50 mt-2"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {renderMediaUploads()}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>

          {submitMessage && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              submitMessage.includes('Thank') 
                ? 'bg-green-500/10 border border-green-500/20 text-green-500' 
                : 'bg-red-500/10 border border-red-500/20 text-red-500'
            }`}>
              <CheckCircle className="w-6 h-6 mx-auto mb-2" />
              <p>{submitMessage}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
