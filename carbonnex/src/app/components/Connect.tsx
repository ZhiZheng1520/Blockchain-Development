// "use client";
//
// import React from 'react';
// import { Button } from '@chakra-ui/react'; // Replace with your preferred UI library
// import { useAccount, useConnect, useDisconnect } from 'wagmi';
//
// export const ConnectButton: React.FC = () => {
//   const { address, isConnecting, isConnected } = useAccount();
//   const { connect, connectors } = useConnect();
//   const { disconnect } = useDisconnect();
//
//   const handleConnect = () => {
//     if (connectors[0]) {
//       connect({ connector: connectors[0] });
//     }
//   };
//
//   const handleDisconnect = () => {
//     disconnect();
//   };
//
//   return (
//     <div>
//       {isConnected ? (
//         <Button onClick={handleDisconnect} colorScheme="red">
//           Disconnect {address && `(${address.slice(0, 6)}...${address.slice(-4)})`}
//         </Button>
//       ) : (
//         <Button onClick={handleConnect} colorScheme="blue" isLoading={isConnecting}>
//           Connect Wallet
//         </Button>
//       )}
//     </div>
//   );
// };
