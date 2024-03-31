// import { z } from 'zod';

// const loginSchema = z.object({
//   username: z.string().min(1, 'Username is required'),
//   password: z.string().min(1, 'Password is required'),
// });
// const signupSchema = z.object({
//   firstName: z.string().min(1, 'First Name is required'),
//   lastName: z.string().min(1, 'Last Name is required'),
//   email: z.string().email('Invalid email format'),
// });
// const authFormSchema = signupSchema.merge(loginSchema);
// const addDeckSchema = z.object({
//   name: z.string().min(1, 'Deck Name is required'),
//   description: z.string().min(1, 'Description is required').optional(),
// });
// const updateDeckSchema = z.object({
//   tags: z.array(z.string()).optional(), // Assuming tags can be optional
//   color: z.enum([
//     'red',
//     'blue',
//     'green',
//     'yellow',
//     'purple',
//     'pink',
//     'orange',
//     'teal',
//   ]),
// });
// const deckFormSchema = addDeckSchema.merge(updateDeckSchema);
// const collectionFormSchema = z.object({
//   name: z.string().min(1, 'Collection Name is required'),
//   description: z.string().min(1, 'Collection Description is required'),
// });
// const searchFormSchema = z.object({
//   searchTerm: z.string().optional(),
// });
// const statisticsSchema = z.object({
//   selectedStatistic: z
//     .enum([
//       'highPoint',
//       'lowPoint',
//       'twentyFourHourAverage',
//       'average',
//       'volume',
//       'volatility',
//     ])
//     .optional(),
// });
// const themeFormSchema = z.object({
//   theme: z.enum(['light', 'dark', 'system']).optional(),
// });
// const timeRangeFormSchema = z.object({
//   timeRange: z
//     .enum(['24hr', '7d', '30d', '90d', '180d', '270d', '365d'])
//     .optional(),
// });

// export {
//   loginSchema,
//   signupSchema,
//   authFormSchema,
//   addDeckSchema,
//   updateDeckSchema,
//   deckFormSchema,
//   collectionFormSchema,
//   searchFormSchema,
//   statisticsSchema,
//   themeFormSchema,
//   timeRangeFormSchema,
// };
