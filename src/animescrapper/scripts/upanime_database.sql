CREATE DATABASE upanime;



CREATE TABLE AnimeEpisodes (
    AnimeName varchar(255),
    EpisodeNumber integer,
    EpisodeUrl varchar(255),
    Site varchar(255),
    AddedDate timestamp,
    PRIMARY KEY (AnimeName, EpisodeNumber, Site, AddedDate)
);


delete from AnimeEpisodes;

alter table AnimeEpisodes
alter column addeddate type timestamp;

alter table AnimeEpisodes
add primary key (AnimeName, EpisodeNumber, Site);

alter table AnimeEpisodes
drop constraint animeepisodes_pkey;