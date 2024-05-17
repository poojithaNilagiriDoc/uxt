import React from 'react';
import select from 'uxt-graphics/icons/select';
import selectInline from 'uxt-graphics/icons/select-inline';
import selectInside from 'uxt-graphics/icons/select-inside';
import rotate3d from 'uxt-graphics/icons/rotate-3d';
import zoomIn from 'uxt-graphics/icons/zoom-in';
import zoomArea from 'uxt-graphics/icons/zoom-area';
import hand from 'uxt-graphics/icons/hand';
import rotate from 'uxt-graphics/icons/rotate';
import Shell from '../../Shell';
import ToggleIconButton from '../../ToggleIconButton';
import FloatingToolbar from '../index';

export default function FloatingToolbarDynamic() {
  const [selectedTool, setSelectedTool] = React.useState(select);

  return (
    <Shell style={{ alignItems: 'center', paddingTop: 24 }}>
      <FloatingToolbar>
        {[
          select,
          selectInline,
          selectInside,
          rotate3d,
          zoomIn,
          zoomArea,
          hand,
          rotate,
        ].map(toolSvg => (
          <ToggleIconButton
            iconSvg={toolSvg}
            isActive={toolSvg === selectedTool}
            key={toolSvg}
            onClick={() => setSelectedTool(toolSvg)}
          />
        ))}
      </FloatingToolbar>
    </Shell>
  );
}
