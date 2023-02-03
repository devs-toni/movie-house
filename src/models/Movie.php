<?php

class Movie
{
  private string $title;
  private string $language;
  private string $description;
  private string $posterPath;
  private string $releaseDate;
  private float $voteAverage;
  private int $voteCount;

  function __construct(string $title, string $language, string $description, string $posterPath, string $releaseDate, float $voteAverage)
  {
    $this->title = $title;
    $this->language = $language;
    $this->description = $description;
    $this->posterPath = $posterPath;
    $this->releaseDate = $releaseDate;
    $this->voteAverage = $voteAverage;
    $this->voteCount = 0;
  }


  public function getTitle()
  {
    return $this->title;
  }

  public function getLanguage()
  {
    return $this->language;
  }
  public function getDescription()
  {
    return $this->description;
  }

  public function getPosterPath()
  {
    return $this->posterPath;
  }

  public function getReleaseDate()
  {
    return $this->releaseDate;
  }

  public function getVoteAverage()
  {
    return $this->voteAverage;
  }
  public function getVoteCount()
  {
    return $this->voteCount;
  }
}