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

type Year = '2019' | '2020' | '2021' | '2022' | 2019 | 2020 | 2021 | 2022;

type Bounds = {
    height?: number;
    width?: number;
    x: number;
    y: number;
}

export { Config, Topic, ClockTopic, Year, Bounds };
