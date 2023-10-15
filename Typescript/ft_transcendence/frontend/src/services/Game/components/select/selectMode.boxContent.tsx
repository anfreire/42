import { SoloOrDuoBoxContent, WhichModeBoxContent, useGame } from "../..";

export default function SelectModeBoxContent() {
  const game = useGame();

  return (
    <>
      {game.location === "SOLO_OR_DUO" ? (
        <SoloOrDuoBoxContent />
      ) : (
        <WhichModeBoxContent />
      )}
    </>
  );
}
