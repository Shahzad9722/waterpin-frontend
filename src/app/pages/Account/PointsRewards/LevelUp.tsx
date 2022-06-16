import StartRewards from './StartReward';
import BronzeReward from './BronzeReward';
import SilverReward from './SilverReward';
import GoldReward from './GoldReward';
import { SettingsCard } from '../index';

interface Props {
  user: any;
}

export default function LevelUp(props: Props) {
  function renderSettingsView(rank: String) {
    switch (rank) {
      case 'new':
        return (
          <StartRewards
            user={props.user}
            rewardItems={props.user.rewards}
            userRank={props.user.rank}
          />
        );
      case 'bronze':
        return (
          <BronzeReward
            user={props.user}
            rewardItems={props.user.rewards}
            userRank={props.user.rank}
          />
        );
      case 'silver':
        return (
          <SilverReward
            user={props.user}
            rewardItems={props.user.rewards}
            userRank={props.user.rank}
          />
        );
      case 'gold':
        return (
          <GoldReward
            user={props.user}
            rewardItems={props.user.rewards}
            userRank={props.user.rank}
          />
        );

      default:
        return (
          <StartRewards
            user={props.user}
            rewardItems={props.user.rewards}
            userRank={props.user.rank}
          />
        );
    }
  }

  return (
    <SettingsCard>
      {props.user && renderSettingsView(props.user.rank)}
    </SettingsCard>
  );
}
