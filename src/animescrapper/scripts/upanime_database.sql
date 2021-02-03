CREATE DATABASE upanime;



CREATE TABLE AnimeEpisodes (
    AnimeName varchar(255),
    EpisodeNumber integer,
    EpisodeUrl varchar(255),
    Site varchar(255),
    AddedDate date
);


delete from AnimeEpisodes;
