// // Providers.jsx
// import React, { useEffect } from 'react';

// const Providers = ({ children }) => {
//   const { theme } = useMode();
//   const stripePromise = loadStripe(
//     process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
//   );

//   // Function to log the provider status
//   export const logProviderStatus = (providerName) => {
//     useEffect(() => {
//       console.log(`${providerName} initialized successfully.`);
//     }, []);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {/* <GlobalStyles /> */}

//       <PageProvider>
//         {logProviderStatus('PageProvider')}
//         <AuthProvider>
//           {logProviderStatus('AuthProvider')}
//           <FormProvider>
//             {logProviderStatus('FormProvider')}
//             <SocketProvider>
//               {logProviderStatus('SocketProvider')}
//               <UserProvider>
//                 {logProviderStatus('UserProvider')}
//                 <ModalProvider>
//                   {logProviderStatus('ModalProvider')}
//                   <PopoverProvider>
//                     {logProviderStatus('PopoverProvider')}
//                     <CollectionProvider>
//                       {logProviderStatus('CollectionProvider')}
//                       <CombinedProvider>
//                         {logProviderStatus('CombinedProvider')}
//                         <CardProvider>
//                           {logProviderStatus('CardProvider')}
//                           <CronJobProvider>
//                             {logProviderStatus('CronJobProvider')}
//                             <DeckProvider>
//                               {logProviderStatus('DeckProvider')}
//                               <CartProvider>
//                                 {logProviderStatus('CartProvider')}
//                                 <CardImagesProvider>
//                                   {logProviderStatus('CardImagesProvider')}
//                                   <ChartProvider>
//                                     {logProviderStatus('ChartProvider')}
//                                     <StatisticsProvider>
//                                       {logProviderStatus('StatisticsProvider')}
//                                       <SidebarProvider>
//                                         {logProviderStatus('SidebarProvider')}
//                                         <AppContextProvider>
//                                           {logProviderStatus(
//                                             'AppContextProvider'
//                                           )}
//                                           <Elements stripe={stripePromise}>
//                                             {children}
//                                           </Elements>
//                                         </AppContextProvider>
//                                       </SidebarProvider>
//                                     </StatisticsProvider>
//                                   </ChartProvider>
//                                 </CardImagesProvider>
//                               </CartProvider>
//                             </DeckProvider>
//                           </CronJobProvider>
//                         </CardProvider>
//                       </CombinedProvider>
//                     </CollectionProvider>
//                   </PopoverProvider>
//                 </ModalProvider>
//               </UserProvider>
//             </SocketProvider>
//           </FormProvider>
//         </AuthProvider>
//       </PageProvider>
//     </ThemeProvider>
//   );
// };
