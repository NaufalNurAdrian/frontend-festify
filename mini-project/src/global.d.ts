declare interface Window {
  snap: {
    embed: (token: string, options: { embedId: string }) => void;
    pay: (token: string) => void;
  };
}
