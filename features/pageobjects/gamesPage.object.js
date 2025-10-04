import { browser } from '../hooks/hooks.js';

const gamesPageObject = {
    'Today': async () =>  $("//*[@data-testid='dateNavigatorTodayButton']"),
    'Date Navigator Prev Date': async () =>  $("//*[@data-testid='dateNavigatorPrevDateButton']"),
    'Date Navigator Next Date': async () =>  $("//*[@data-testid='dateNavigatorNextDateButton']"),
    'Broadcast Options': async () =>  $("//*[@data-testid='broadcastOptionsButton']"),
    'Blackout': async () =>  $("//*[@data-testid='blackoutIcon']"),
    'AppleTv+ Icon': async () =>  $("//*[@data-testid='appleTvIcon']"),
    'Feed Modal': async () =>  $("//*[@data-testid='feedSelect']"),
    'Bit Early on Modal': async () =>  $("//*[@data-testid='noFeeds']"),
    'Upgrade MLB.TV': async () =>  $("//*[@data-testid='upgradeMlbTvButton']"),
    'Get MLB.TV': async () =>  $("//*[@data-testid='getMlbTvButton']"),
    'Milb Carousel': async () =>  $("//*[@data-testid='Minnesota Twins Affiliated MiLB Games-come-back-soon-for-milb-on-mlb-tv-0']"),
    'Partner Icon': async () =>  $("//*[@data-testid='partnerIcon']"),
    'Fox feed': async () =>  $("//*[@data-testid='feedButton-FOX']"),
    'Feed': async () =>  $("(//*[contains(@data-testid,'streamSelection')]//span[contains(@data-testid,'feedButton')])[1]"),
    'Game Tile by Game Pk': async (gamePk) => $(`//*[@data-testid="${gamePk}"]`),
    'Watch Live': async () =>  $("//*[@data-testid='watchLiveLink']"),
    'Resume': async () =>  $("//*[@data-testid='resumeLink']"),
    'Start From The Beginning': async () =>  $("//*[@data-testid='startFromBeginningLink']"),
    'Blackout message modal': async () =>  $("//*[@data-testid='blackoutMessageContainer']"),
    'First Game Tile in Games page': async () =>  $("//*[@data-testid='gameTileGrid']//button[1]"),

   };
   
   export default gamesPageObject;