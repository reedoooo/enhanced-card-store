import React from 'react';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import styled from 'styled-components';
// const CardContainer = styled.div`
//   padding: ${({ theme, hasTitle }) => (hasTitle ? 0 : theme.lenMd3)};
//   margin-bottom: ${({ theme, noBottomMargin }) =>
//     noBottomMargin ? 0 : theme.lenMd1};
//   border-radius: ${({ theme }) => theme.borderRadius};
//   background: ${({ theme, isPrimary, isAccent }) =>
//     isPrimary
//       ? theme.colorPrimary
//       : isAccent
//         ? theme.colorAccent
//         : theme.colorCardBackground};
//   color: ${({ theme, isPrimary, isAccent }) =>
//     isPrimary
//       ? theme.colorPrimaryText
//       : isAccent
//         ? theme.colorAccentText
//         : theme.colorText};
// `;
// const Content = styled.div`
//   padding: ${({ theme }) => `0 ${theme.lenMd3} ${theme.lenMd3}`};
// `;

// const Title = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: ${({ theme }) => theme.lenXl2};
//   padding: ${({ theme }) => `0 ${theme.lenMd1}`};
//   color: ${({ theme }) => theme.colorLabel};
//   font-size: ${({ theme }) => theme.lenMd2};
// `;
const getPrimaryStyle = (theme, isPrimary) => ({
  background: isPrimary ? theme.colorPrimary : undefined,
  color: isPrimary ? theme.colorPrimaryText : undefined,
});

const getAccentStyle = (theme, isAccent) => ({
  background: isAccent ? theme.colorAccent : undefined,
  color: isAccent ? theme.colorAccentText : undefined,
});

const getTableOrChartStyle = (theme, isTableOrChart) => ({
  background: isTableOrChart ? theme.colorCardBackground : undefined,
  color: isTableOrChart ? theme.colorPrimary : undefined,
});

const getFormHeaderStyle = (theme, isFormHeader) => ({
  background: isFormHeader ? theme.colorCardBackground : undefined,
  color: isFormHeader ? theme.colorPrimary : undefined,
  maxWidth: 'md',
  padding: theme.lenMd3, // Updated to use theme's spacing method if available
  borderRadius: '24px',
  boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)', // Custom shadow with blur
  margin: 'auto',
  width: '80%',
});

const CardContent = ({ theme, children }) => (
  <div style={{ padding: `0 ${theme.lenMd1} ${theme.lenMd2}` }}>{children}</div>
);

const CardTitle = ({ theme, children, isTableOrChart }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.lenXl2,
      padding: `0 ${theme.lenMd1}`,
      // color: theme.colorLabel,
      color: theme.colorLabel,
      fontSize: theme.lenMd2,
      // overflow: 'hidden',
    }}
  >
    <MDTypography
      variant="h6"
      color={isTableOrChart ? theme.colorPrimary : theme.colorLabel}
      component="div"
    >
      {children}
    </MDTypography>
  </div>
);

const SimpleCard = ({
  theme,
  hasTitle,
  isPrimary,
  isAccent,
  isTableOrChart,
  noBottomMargin,
  children,
  cardTitle,
  data,
  isFormHeader,
  ...rest
}) => {
  const cardStyle = {
    // display: 'flex',
    width: '100%',
    padding: hasTitle ? 0 : theme.lenMd1,
    marginBottom: noBottomMargin ? 0 : theme.lenMd1,
    borderRadius: theme.borderRadius,
    background: theme.colorCardBackground,
    color: theme.colorText,
    ...(isFormHeader && getFormHeaderStyle(theme, true)),
    ...(isTableOrChart && getTableOrChartStyle(theme, true)),
    ...(isPrimary && getPrimaryStyle(theme, true)),
    ...(isAccent && getAccentStyle(theme, true)),
  };

  return (
    <div style={cardStyle} {...rest}>
      {cardTitle && (
        <>
          <CardTitle theme={theme} isTableOrChart={isTableOrChart}>
            {cardTitle}
          </CardTitle>
          <CardContent theme={theme}>{children}</CardContent>
        </>
      )}
      {!cardTitle && children}
    </div>
  );
};

export default SimpleCard;

// const CardContent = ({ theme, children }) => (
//   <div style={{ padding: `0 ${theme.lenMd3} ${theme.lenMd3}` }}>{children}</div>
// );

// const CardTitle = ({ theme, children }) => (
//   <div
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: theme.lenXl2,
//       padding: `0 ${theme.lenMd1}`,
//       color: theme.colorLabel,
//       fontSize: theme.lenMd2,
//     }}
//   >
//     {children}
//   </div>
// );

// export const SimpleCard = () => {
//   theme,
//   children,
//   cardTitle,
//   isPrimary,
//   isAccent,
//   noBottomMargin,
// }) => {
//   return (
//     <Card
//       theme={theme}
//       hasTitle={!!cardTitle}
//       isPrimary={isPrimary}
//       isAccent={isAccent}
//       noBottomMargin={noBottomMargin}
//       {...rest}
//     >
//       {cardTitle && (
//         <>
//           <CardTitle theme={theme}>{cardTitle}</CardTitle>
//           <CardContent theme={theme}>{children}</CardContent>
//         </>
//       )}
//       {!cardTitle && children}
//     </Card>
//   );
// };
