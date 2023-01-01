type Config = {
    host: string;
    port: number | string;
};

type Topic =
    | 'ArchiveStatus'
    | 'AudioStreams'
    | 'CarData'
    | 'ChampionshipPrediction'
    | 'ContentStreams'
    | 'DriverList'
    | 'ExtrapolatedClock'
    | 'Heartbeat'
    | 'LapCount'
    | 'LapSeries'
    | 'PitLaneTimeCollection'
    | 'Position'
    | 'RaceControlMessages'
    | 'SessionData'
    | 'SessionInfo'
    | 'SessionStatus'
    | 'TeamRadio'
    | 'TimingAppData'
    | 'TimingData'
    | 'TimingStats'
    | 'TopThree'
    | 'TrackStatus'
    | 'WeatherData'
    | 'WeatherDataSeries';

type ClockTopic = 'paused' | 'systemTime' | 'trackTime' | 'liveTimingStartTime';

export { Config, Topic, ClockTopic };
