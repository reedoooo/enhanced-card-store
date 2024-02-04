const cssbaseline = {
  styleOverrides: {
    display: 'flex',
    // body: {
    //   backgroundColor: mode === 'dark' ? '#333' : '#ffffff',
    // },
  },
};

const button = {
  styleOverrides: {
    root: {
      borderRadius: 4,
      padding: '0.5rem 1rem',
      textTransform: 'none', // Disable uppercase text
      backgroundColor: '#4cceac',
      '&:hover': {
        backgroundColor: '#3da58a',
      },
      '@media (max-width:600px)': {
        // Responsive styles
        fontSize: '0.875rem',
      },
    },
  },
};

const container = {
  styleOverrides: {
    root: {
      margin: 0,
      padding: 0,
    },
  },
};

const listItemButton = {
  styleOverrides: {
    root: {
      color: '#4cceac',
      paddingTop: '10px',
      paddingBottom: '10px',
      '&.Mui-selected': {
        color: '#3da58a',
        backgroundColor: '#4cceac',
        '&:hover': {
          backgroundColor: '#3da58a',
        },
        '& .MuiListItemIcon-root': {
          color: '#3da58a',
        },
      },
      '&:hover': {
        backgroundColor: '#3da58a',
        color: '#3da58a',
        '& .MuiListItemIcon-root': {
          color: '#3da58a',
        },
      },
    },
  },
};

const outlinedInput = {
  styleOverrides: {
    root: {
      background: '#ffffff',
      borderRadius: '4px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#333',
      },
      '&:hover $notchedOutline': {
        borderColor: '#4cceac',
      },
      '&.MuiInputBase-multiline': {
        padding: '1px',
      },
    },

    input: {
      fontWeight: 500,
      background: '#ffffff',
      padding: '15.5px 14px',
      borderRadius: '4px',
      '&.MuiInputBase-inputSizeSmall': {
        padding: '10px 14px',
        '&.MuiInputBase-inputAdornedStart': {
          paddingLeft: 0,
        },
      },
    },
    inputAdornedStart: {
      paddingLeft: '4px',
    },
    notchedOutline: {
      borderRadius: '4px',
    },
  },
};

export const components = {
  MuiCssBaseline: cssbaseline,
  MuiButton: button,
  MuiContainer: container,
  MuiListItemButton: listItemButton,
  // MuiOutlinedInput: outlinedInput,
};

export default components;
// MuiListItemButton: {
// 	styleOverrides: {
// 		root: {
// 			color: colorsA.greenAccent[500],
// 			paddingTop: '10px',
// 			paddingBottom: '10px',
// 			'&.Mui-selected': {
// 				color: colorsA.greenAccent[200],
// 				backgroundColor: colorsA.greenAccent[300],
// 				'&:hover': {
// 					backgroundColor: colorsA.greenAccent[700],
// 				},
// 				'& .MuiListItemIcon-root': {
// 					color: colorsA.greenAccent[400],
// 				},
// 			},
// 			'&:hover': {
// 				backgroundColor: colorsA.greenAccent[400],
// 				color: colorsA.greenAccent[200],
// 				'& .MuiListItemIcon-root': {
// 					color: colors.greenAccent[400],
// 				},
// 			},
// 		},
// 	},
// },
// MuiOutlinedInput: {
// 	styleOverrides: {
// 		root: {
// 			background: backgroundA.default,
// 			borderRadius: `${themeColors?.borderRadius}px`,
// 			'& .MuiOutlinedInput-notchedOutline': {
// 				borderColor: themeColors.colors?.grey400,
// 			},
// 			'&:hover $notchedOutline': {
// 				borderColor: themeColors?.primaryLight,
// 			},
// 			'&.MuiInputBase-multiline': {
// 				padding: 1,
// 			},
// 		},
// 		input: {
// 			fontWeight: 500,
// 			background: backgroundA.default,
// 			padding: '15.5px 14px',
// 			borderRadius: `${themeColors?.borderRadius}px`,
// 			'&.MuiInputBase-inputSizeSmall': {
// 				padding: '10px 14px',
// 				'&.MuiInputBase-inputAdornedStart': {
// 					paddingLeft: 0,
// 				},
// 			},
// 		},
// 		inputAdornedStart: {
// 			paddingLeft: 4,
// 		},
// 		notchedOutline: {
// 			borderRadius: `${themeColors?.customization?.borderRadius}px`,
// 		},
// 	},
// },
