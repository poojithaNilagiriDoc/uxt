import React from 'react';
import useCounter from 'react-use/lib/useCounter';
import useToggle from 'react-use/lib/useToggle';
import Shell from '../../Shell';
import PushPanel from '../index';

export default function PushPanelResizer() {
  const [isOpen, toggleIsOpen] = useToggle(true);
  const [width, { set: setWidth }] = useCounter(256);

  return (
    <Shell style={{ flexDirection: 'row' }}>
      <PushPanel
        isOpen={isOpen}
        minWidth={56}
        onWidthChange={setWidth}
        maxWidth="50%"
        width={width}
      >
        <div
          style={{
            borderRight: '1px solid #ddd',
            flex: '1 1 auto',
            overflowY: 'auto',
          }}
        >
          <p>
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis
            ligula ut lorem ullamcorper laoreet pulvinar a ex. Maecenas sit amet
            vehicula libero, vel sodales tortor. Proin in elit sit amet arcu
            auctor pharetra. Cras ultricies eleifend blandit. Duis et ornare
            arcu. Etiam tristique id erat sodales cursus. Donec pellentesque,
            nunc aliquam ornare egestas, lacus odio facilisis arcu, in convallis
            metus mauris eget ipsum. Suspendisse ac tempus ex, eu tempus ligula.
            In in commodo magna, nec scelerisque erat. Sed id aliquet neque.
            Pellentesque vehicula ac risus sodales tincidunt. Pellentesque
            euismod purus eget ex laoreet, eget malesuada ipsum blandit.',
            'Aliquam ac elit at ante pulvinar auctor. Fusce vestibulum, nisi
            vitae suscipit dictum, magna est interdum sapien, ut dictum leo ante
            a nibh. Sed id metus eu leo suscipit aliquam. Integer in malesuada
            est. Nulla congue id massa sed hendrerit. Praesent mattis turpis
            eget quam rhoncus, ut iaculis libero placerat. Quisque vitae
            consectetur erat, eu vulputate elit. Vestibulum egestas mi id neque
            fringilla, vitae dignissim ante gravida. Curabitur ornare faucibus
            placerat. Suspendisse in lorem eu massa convallis consequat vitae
            eget magna. Nunc bibendum mi non felis porttitor, vitae auctor magna
            pharetra.', 'Fusce laoreet, nunc in elementum vulputate, quam odio
          </p>
        </div>
      </PushPanel>
      <div style={{ flex: '1 1 auto' }} onClick={toggleIsOpen}>
        Main Content
      </div>
    </Shell>
  );
}
