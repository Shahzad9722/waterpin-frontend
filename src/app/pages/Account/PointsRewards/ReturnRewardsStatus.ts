export const returnStatusImage = (
  status: number,
  actionsCompleted:number,
  actionsRequire:number,
) => {
  console.log(actionsCompleted, actionsRequire);
  if (actionsCompleted <= 0) {
      return '/NotComplete.svg';
  }
     if (actionsCompleted === actionsRequire) {
       return '/complete_item.svg';
     }
  if (actionsCompleted > 0) {
    return '/inProgress.svg';
  }
};
