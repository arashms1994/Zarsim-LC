export function calculateExitSummary(exitRequests: any[]) {
  let totalMetraj = 0;
  let totalMablagh = 0;

  exitRequests.forEach((item) => {
    const metraj = parseFloat(item.metrajdarkhast?.replace(/\s/g, '') || "0");

    const mablagh = parseFloat(
      item.date_k?.replace(/,/g, '').replace(/\s/g, '') || "0"
    );

    totalMetraj += metraj;
    totalMablagh += mablagh;
  });

  return {
    totalMetraj,
    totalMablagh,
  };
}

export function formatRial(amount: number) {
  return amount.toLocaleString("fa-IR");
}
