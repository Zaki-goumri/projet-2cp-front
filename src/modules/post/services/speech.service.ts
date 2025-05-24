import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export class SpeechService {
  private static instance: SpeechService;
  private speechConfig: sdk.SpeechConfig | null = null;
  private synthesizer: sdk.SpeechSynthesizer | null = null;

  private constructor() {
    // Initialize with your Azure Speech Service key and region
    const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
    const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

    console.log('Speech Service Initialization:', {
      hasKey: !!speechKey,
      hasRegion: !!speechRegion,
      region: speechRegion
    });

    if (!speechKey || !speechRegion) {
      console.error('Azure Speech Service credentials are missing. Please set NEXT_PUBLIC_AZURE_SPEECH_KEY and NEXT_PUBLIC_AZURE_SPEECH_REGION in your .env.local file');
      return;
    }

    try {
      this.speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      
      // List available voices
      const voices = this.speechConfig.getVoices();
      console.log('Available voices:', voices);

      // Use a high-quality neural voice
      this.speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
      
      // Configure audio output
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
      this.synthesizer = new sdk.SpeechSynthesizer(this.speechConfig, audioConfig);
      
      console.log('Speech Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Speech Service:', error);
    }
  }

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  public async speak(text: string): Promise<void> {
    if (!this.synthesizer) {
      console.error('Speech synthesizer not initialized. Please check your Azure credentials.');
      return;
    }

    try {
      console.log('Starting speech synthesis for text:', text);
      
      // Create a new synthesizer for each speech to avoid issues
      const synthesizer = new sdk.SpeechSynthesizer(this.speechConfig!, sdk.AudioConfig.fromDefaultSpeakerOutput());
      
      const result = await synthesizer.speakTextAsync(text);
      
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log('Speech synthesis completed successfully');
      } else {
        console.error('Speech synthesis failed:', {
          reason: result.reason,
          errorDetails: result.errorDetails,
          properties: result.properties
        });
      }
      
      synthesizer.close();
    } catch (error) {
      console.error('Error during speech synthesis:', error);
    }
  }

  public stop(): void {
    if (this.synthesizer) {
      try {
        this.synthesizer.close();
        this.synthesizer = new sdk.SpeechSynthesizer(this.speechConfig!, sdk.AudioConfig.fromDefaultSpeakerOutput());
        console.log('Speech synthesis stopped');
      } catch (error) {
        console.error('Error stopping speech synthesis:', error);
      }
    }
  }

  public dispose(): void {
    if (this.synthesizer) {
      try {
        this.synthesizer.close();
        this.synthesizer = null;
        console.log('Speech synthesizer disposed');
      } catch (error) {
        console.error('Error disposing speech synthesizer:', error);
      }
    }
    if (this.speechConfig) {
      this.speechConfig = null;
    }
  }
} 