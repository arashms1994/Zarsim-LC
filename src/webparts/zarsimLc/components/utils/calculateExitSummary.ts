export function calculateExitSummary(exitRequests: any[]) {
  let totalMetraj = 0;
  let totalMablagh = 0;

  exitRequests.forEach((item) => {
    const metraj = parseFloat(item.metrajdarkhast) || 0;
    const mablagh = parseFloat(item.date_k) || 0;

    totalMetraj += metraj;
    totalMablagh += mablagh;
  });

  return {
    totalMetraj,
    totalMablagh,
  };
}
