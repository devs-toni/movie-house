<?php

class Movie
{
  private int $id;
  private string $title;
  private string $language;
  private string $description;
  private string $posterPath;
  private $releaseDate;
  private float $voteAverage;
  private int $voteCount;

  function __construct(int $id, string $title, string $language, string $description, string $posterPath, $releaseDate, float $voteAverage)
  {
    $this->id = $id;
    $this->title = $title;
    $this->language = $language;
    $this->description = $description;
    $this->posterPath = $posterPath;
    $this->releaseDate = $releaseDate;
    $this->voteAverage = $voteAverage;
    $this->voteCount = 0;
  }

  public function getId()
  {
    return $this->id;
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