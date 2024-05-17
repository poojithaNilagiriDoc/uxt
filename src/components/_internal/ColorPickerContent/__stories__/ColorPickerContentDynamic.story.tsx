import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import components from 'uxt-graphics/graphics/components';
import Graphic from '../../../Graphic';
import ColorPickerContent from '../index';

export default function ColorPickerContentDynamic() {
  const theme = useTheme();
  const [color, setColor] = React.useState({ a: 1, b: 150, g: 100, r: 50 });
  const [isSavedColorsDeleting, setIsSavedColorsDeleting] =
    React.useState(false);
  const [savedColors, setSavedColors] = React.useState([
    { r: 255, g: 0, b: 0, a: 1 },
    { r: 0, g: 255, b: 0, a: 1 },
    { r: 0, g: 0, b: 255, a: 1 },
    { r: 50, g: 150, b: 255, a: 0.5 },
  ]);
  const [savedColorsCheckedIndices, setSavedColorsCheckedIndices] =
    React.useState<Array<number>>([]);
  const { r, g, b, a } = color;
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <Graphic fill={`rgba(${r}, ${g}, ${b}, ${a})`} svg={components} />
      </div>
      <div
        style={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
          flex: '0 0 auto',
          margin: 16,
          overflow: 'hidden',
          width: 296,
        }}
      >
        <ColorPickerContent
          color={color}
          isSavedColorsDeleting={isSavedColorsDeleting}
          onColorChange={setColor}
          onIsSavedColorsDeletingChange={setIsSavedColorsDeleting}
          onSavedColorsChange={setSavedColors}
          onSavedColorsCheckedIndicesChange={setSavedColorsCheckedIndices}
          permanentColors={[
            { r: 0, g: 0, b: 0, a: 0 },
            { r: 0, g: 0, b: 0, a: 1 },
            { r: 255, g: 255, b: 255, a: 1 },
          ]}
          savedColors={savedColors}
          savedColorsCheckedIndices={savedColorsCheckedIndices}
          width={296}
        />
      </div>
    </div>
  );
}
