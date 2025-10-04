import { browser } from "../../hooks/hooks.js";

const mediaPlayerPageObject = {
  "Video Player": async () => browser.$("//*[@data-testid='videoPlayer']"),
  "Play Button": async () => browser.$("//*[@data-testid='playButton']"),
  "Pause Button": async () => browser.$("//*[@data-testid='pauseButton']"),
  "Volume Control": async () => browser.$("//*[@data-testid='volumeControl']"),
  "Fullscreen Button": async () =>
    browser.$("//*[@data-testid='fullscreenButton']"),
  "Progress Bar": async () => browser.$("//*[@data-testid='progressBar']"),
  "Time Display": async () => browser.$("//*[@data-testid='timeDisplay']"),
  "Closed Captions": async () =>
    browser.$("//*[@data-testid='closedCaptions']"),
  "Quality Settings": async () =>
    browser.$("//*[@data-testid='qualitySettings']"),
  "Player Controls": async () =>
    browser.$("//*[@data-testid='playerControls']"),
  "Loading Spinner": async () => browser.$("//*[@data-testid='spinner']"),
  "Error Message": async () => browser.$("//*[@data-testid='errorMessage']"),
};

export default mediaPlayerPageObject;

