"use client";

interface ConnectionStatusProps {
  statusTitle: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ statusTitle }) => {

  return <div className={`text-white absolute` }>{statusTitle}</div>;
};

export default ConnectionStatus;
