import React from 'react';
import { text } from '@storybook/addon-knobs';
import Shell from '../../Shell';
import About from '../index';

function getLinks(): string[] {
  return [
    '<a href="#/about-basics">Server</a>',
    '<a href="#/about-basics">Tech Support</a>',
  ];
}

function getParagraphs() {
  return [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ligula ut lorem ullamcorper laoreet pulvinar a ex. Maecenas sit amet vehicula libero, vel sodales tortor. Proin in elit sit amet arcu auctor pharetra. Cras ultricies eleifend blandit. Duis et ornare arcu. Etiam tristique id erat sodales cursus. Donec pellentesque, nunc aliquam ornare egestas, lacus odio facilisis arcu, in convallis metus mauris eget ipsum. Suspendisse ac tempus ex, eu tempus ligula. In in commodo magna, nec scelerisque erat. Sed id aliquet neque. Pellentesque vehicula ac risus sodales tincidunt. Pellentesque euismod purus eget ex laoreet, eget malesuada ipsum blandit.',
    'Aliquam ac elit at ante pulvinar auctor. Fusce vestibulum, nisi vitae suscipit dictum, magna est interdum sapien, ut dictum leo ante a nibh. Sed id metus eu leo suscipit aliquam. Integer in malesuada est. Nulla congue id massa sed hendrerit. Praesent mattis turpis eget quam rhoncus, ut iaculis libero placerat. Quisque vitae consectetur erat, eu vulputate elit. Vestibulum egestas mi id neque fringilla, vitae dignissim ante gravida. Curabitur ornare faucibus placerat. Suspendisse in lorem eu massa convallis consequat vitae eget magna. Nunc bibendum mi non felis porttitor, vitae auctor magna pharetra.',
    'Fusce laoreet, nunc in elementum vulputate, quam odio lobortis turpis, a interdum tortor ipsum in nulla. Mauris nunc ex, semper eget gravida quis, volutpat eu arcu. Integer eget risus gravida, consequat orci et, tincidunt arcu. Vestibulum vitae scelerisque elit. Phasellus finibus eros eget nisi vulputate, nec pellentesque erat pulvinar. Nullam magna ligula, cursus eu orci eu, scelerisque aliquet orci. Ut semper ipsum id mi tempus venenatis. Morbi a justo vitae lorem elementum viverra. Vestibulum euismod convallis erat a iaculis. Quisque vitae magna hendrerit, semper augue dapibus, maximus odio. Quisque venenatis auctor tempus. In consectetur, purus non lacinia aliquet, massa sem tincidunt quam, at aliquam orci dolor id massa. Proin ut lacus tellus. Vivamus non lorem non tellus porta facilisis. Proin vulputate porttitor felis, sagittis mollis erat imperdiet vitae.',
    'Aliquam id dolor ut tortor dapibus convallis. Nam rutrum ligula ut aliquet eleifend. Duis rutrum libero libero, nec euismod lacus gravida sed. In nec tincidunt lectus, quis fringilla lectus. Aenean sit amet nunc non leo fermentum rutrum ut et odio. Nulla pretium risus suscipit erat vulputate, nec viverra leo feugiat. Duis tempus in purus at luctus. Donec faucibus, justo vitae placerat sollicitudin, urna nisl malesuada purus, non pellentesque ipsum magna sit amet nisi. Nullam ultricies odio vitae lacus mollis pellentesque. Sed placerat, ligula non vestibulum mattis, neque diam dignissim dui, id ultrices libero est non metus. Proin malesuada eget ligula sed varius. Nulla lacus mi, rhoncus in rhoncus vitae, consectetur ac velit.',
    'Aenean venenatis libero nec malesuada cursus. Fusce at eros sit amet quam placerat fringilla eu quis metus. Morbi a magna nec odio maximus placerat sit amet at tellus. Quisque sapien augue, lacinia eget orci at, hendrerit rutrum velit. Integer magna urna, sagittis a commodo id, feugiat id diam. Vestibulum quis faucibus odio, cursus convallis quam. Quisque placerat ut leo lacinia lacinia. Praesent fermentum, orci nec vulputate sodales, risus sem interdum nulla, et gravida ex magna at augue. Integer vestibulum, ligula id feugiat tempor, tortor urna laoreet orci, eget convallis orci felis ultrices tellus. Maecenas tempor nulla a magna molestie accumsan. Morbi tortor velit, semper eget mollis vitae, ornare ac sapien. Nunc rhoncus quam quam, sit amet malesuada neque dignissim eu. Vestibulum consectetur orci ante. Cras iaculis, nibh non malesuada egestas, eros purus iaculis ex, sit amet interdum odio tellus non tellus. Sed vitae lectus faucibus, sodales quam eget, laoreet risus. In ornare ullamcorper mauris id ultrices.',
  ];
}

export default function AboutBasics() {
  return (
    <Shell>
      <About>
        <h1>{text('Product Title', 'Intergraph Smart Product')}</h1>
        <h2>{text('Version', '2017 (00.00.00.0001)')}</h2>
        {getParagraphs().map((paragraph, index) => (
          <p
            dangerouslySetInnerHTML={{
              __html: paragraph,
            }}
            key={index}
          />
        ))}
        <ul>
          {getLinks().map((link, index) => (
            <li
              dangerouslySetInnerHTML={{
                __html: link,
              }}
              key={index}
            />
          ))}
        </ul>
      </About>
    </Shell>
  );
}
