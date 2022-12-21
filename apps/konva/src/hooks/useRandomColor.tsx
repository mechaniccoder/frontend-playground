export function useRandomColor(colors: string[] = ['#2B3A55', '#CE7777', '#E8C4C4', '#F2E5E5']) {
  return () => colors[Math.floor(Math.random() * (colors.length - 1))];
}
