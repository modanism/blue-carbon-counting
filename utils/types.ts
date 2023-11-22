type StepData = {
  title: string;
  desc: string;
};

type ButtonProps = {
  text: string;
  dest : string;
  isAnimate: boolean;
  isThin: boolean;
};

type StepProps = {
  index: number;
  title: string;
  desc: string;
  isFirst: boolean;
};
