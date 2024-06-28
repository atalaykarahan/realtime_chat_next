"use client";

interface ConnectionStatusProps {
  statusTitle: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ statusTitle }) => {
  return <div className={`text-center bg-white`}>{statusTitle}</div>;
};

export default ConnectionStatus;
