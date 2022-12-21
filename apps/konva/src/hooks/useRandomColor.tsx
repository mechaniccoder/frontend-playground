export function useRandomColor(colors: string[] = ['#EFF5F5', '#D6E4E5', '#497174', '#EB6440']) {
  return () => colors[Math.floor(Math.random() * (colors.length - 1))];
}
