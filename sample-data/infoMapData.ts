import boq from 'uxt-graphics/icons/bill-of-quantities';
import cost from 'uxt-graphics/icons/cost-estimation';
import model from 'uxt-graphics/icons/model';
import workPackage from 'uxt-graphics/icons/work-package';
import modelGroup from 'uxt-graphics/icons/model-group';
import issue from 'uxt-graphics/icons/warning';
import { Data, LinkType, NodeType } from '../src/components/InfoMap/index';
import Shape from '../src/components/constants/shape';

export const initialData: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'cost',
      target: 'boq',
    },
    {
      source: 'cost',
      target: 'issues',
    },
    {
      source: 'issues',
      target: 'slab_02',
    },
    {
      source: 'cost',
      target: 'model(3)',
    },
    {
      source: 'cost',
      target: 'workPackage',
    },
    {
      source: 'workPackage',
      target: 'slab_01',
    },
    {
      source: 'model(3)',
      target: 'slab_01',
    },
    {
      source: 'model(3)',
      target: 'slab_02',
    },
    {
      source: 'model(3)',
      target: 'slab_03',
    },
  ],
  nodes: [
    {
      id: 'cost',
      color:
        'transparent linear-gradient(0deg, #4C8B2B 0%, #77BC1F 100%) 0% 0% no-repeat padding-box',
      iconSvg: cost,
    },
    {
      id: 'boq',
      color:
        'transparent linear-gradient(0deg, #C2642A 0%, #FFA400 100%) 0% 0% no-repeat padding-box',
      iconSvg: boq,
    },
    {
      id: 'workPackage',
      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
      iconSvg: workPackage,
    },
    {
      id: 'issues',
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
      iconSvg: issue,
    },
    {
      id: 'model(3)',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: modelGroup,
      isClustered: true,
    },
    {
      id: 'slab_01',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'slab_02',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'slab_03',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
  ],
};

export const slab01: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'slab_01',
      target: 'digitalLayout',
    },
    {
      source: 'slab_01',
      target: 'points',
    },
    {
      source: 'slab_01',
      target: 'files',
    },
    {
      source: 'slab_01',
      target: 'modalCompare',
    },
  ],
  nodes: [
    {
      id: 'digitalLayout',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'points',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'files',
      iconSvg: model,
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
    },
    {
      id: 'modalCompare',
      iconSvg: model,
      shape: Shape.Rectangle,
    },
  ],
};

export const workPackageData: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'workPackage',
      target: 'wp_documentsManagement',
    },
    {
      source: 'workPackage',
      target: 'wp_5DBIM',
    },
    {
      source: 'workPackage',
      target: 'wp_Test',
    },
    {
      source: 'workPackage',
      target: 'wp_Project',
    },
    {
      source: 'workPackage',
      target: 'wp_modalFiles',
    },
    {
      source: 'workPackage',
      target: 'wp_forms',
    },
    {
      source: 'workPackage',
      target: 'wp_assignees',
    },
  ],
  nodes: [
    {
      id: 'wp_documentsManagement',
      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
      iconSvg: workPackage,
    },
    {
      id: 'wp_5DBIM',
      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
      iconSvg: workPackage,
    },
    {
      id: 'wp_Test',
      iconSvg: workPackage,
      shape: Shape.Rectangle,
    },
    {
      id: 'wp_Project',
      iconSvg: workPackage,

      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
    },
    {
      id: 'wp_modalFiles',
      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
      iconSvg: workPackage,
    },
    {
      id: 'wp_forms',
      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
      iconSvg: workPackage,
      shape: Shape.Rectangle,
    },
    {
      id: 'wp_assignees',
      iconSvg: workPackage,

      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
    },
  ],
};

export const slab02: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'slab_02',
      target: 'md_analysis',
    },
    {
      source: 'slab_02',
      target: 'md_comments',
    },
    {
      source: 'slab_02',
      target: 'md_document',
    },
    {
      source: 'slab_02',
      target: 'md_reports',
    },
  ],
  nodes: [
    {
      id: 'md_analysis',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'md_comments',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'md_document',
      iconSvg: model,

      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
    },
    {
      id: 'md_reports',
      shape: Shape.Rectangle,
      iconSvg: model,
    },
  ],
};

export const slab03: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'slab_03',
      target: 'roof',
    },
    {
      source: 'slab_03',
      target: 'beams',
    },
    {
      source: 'slab_03',
      target: 'soil',
    },
  ],
  nodes: [
    {
      id: 'roof',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'beams',
      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
      iconSvg: model,
    },
    {
      id: 'soil',
      iconSvg: model,

      color:
        'transparent linear-gradient(0deg, #1825AA 0%, #8B8BFC 100%) 0% 0% no-repeat padding-box',
    },
  ],
};

export const issuesData: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'issues',
      target: 'documentsManagement',
    },
    {
      source: 'issues',
      target: '5DBIM',
    },
    {
      source: 'issues',
      target: 'Test',
    },
    {
      source: 'issues',
      target: 'Project',
    },
    {
      source: 'issues',
      target: 'forms',
    },
    {
      source: 'issues',
      target: 'assignees',
    },
  ],
  nodes: [
    {
      id: 'documentsManagement',
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
      iconSvg: issue,
    },
    {
      id: '5DBIM',
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
      iconSvg: issue,
    },
    {
      id: 'Test',
      iconSvg: issue,
      shape: Shape.Rectangle,
    },
    {
      id: 'Project',
      iconSvg: issue,
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
    },
    {
      id: 'forms',
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
      iconSvg: issue,
      shape: Shape.Rectangle,
    },
    {
      id: 'assignees',
      iconSvg: issue,
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
    },
  ],
};

export const boqData: Data<NodeType, LinkType<NodeType>> = {
  links: [
    {
      source: 'boq',
      target: 'analysis',
    },
    {
      source: 'boq',
      target: 'comments',
    },
    {
      source: 'boq',
      target: 'document',
    },
    {
      source: 'boq',
      target: 'reports',
    },
  ],

  nodes: [
    {
      id: 'analysis',
      color:
        'transparent linear-gradient(0deg, #C2642A 0%, #FFA400 100%) 0% 0% no-repeat padding-box',
      iconSvg: boq,
    },
    {
      id: 'comments',
      color:
        'transparent linear-gradient(0deg, #C2642A 0%, #FFA400 100%) 0% 0% no-repeat padding-box',
      iconSvg: boq,
    },
    {
      id: 'document',
      iconSvg: boq,

      color:
        'transparent linear-gradient(0deg, #C2642A 0%, #FFA400 100%) 0% 0% no-repeat padding-box',
    },
    {
      id: 'reports',
      shape: Shape.Rectangle,
      iconSvg: boq,
    },
  ],
};

export const costIndirectRelationshipsData: Data<
  NodeType,
  LinkType<NodeType>
> = {
  links: [
    {
      source: 'boq',
      target: 'wp',
    },
    {
      source: 'issues',
      target: 'workStep',
    },
    {
      source: 'workPackage',
      target: 'costEstimate',
    },
  ],
  nodes: [
    {
      id: 'wp',
      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
      iconSvg: workPackage,
    },
    {
      id: 'workStep',
      color:
        'transparent linear-gradient(180deg, #0084AD 0%, #08C0DE 100%) 0% 0% no-repeat padding-box',
      iconSvg: workPackage,
    },
    {
      id: 'costEstimate',
      color:
        'transparent linear-gradient(0deg, #4C8B2B 0%, #77BC1F 100%) 0% 0% no-repeat padding-box',
      iconSvg: cost,
    },
  ],
};

export const issuesIndirectRelationshipsData: Data<
  NodeType,
  LinkType<NodeType>
> = {
  links: [
    {
      source: 'workPackage',
      target: 'bim',
    },
    {
      source: 'boq',
      target: 'modalCompare',
    },
  ],
  nodes: [
    {
      id: 'bim',
      color:
        'transparent linear-gradient(0deg, #C2642A 0%, #FFA400 100%) 0% 0% no-repeat padding-box',
      iconSvg: issue,
    },
    {
      id: 'modalCompare',
      color:
        'transparent linear-gradient(0deg, #C2642A 0%, #FFA400 100%) 0% 0% no-repeat padding-box',
      iconSvg: issue,
      shape: Shape.Rectangle,
    },
  ],
};

export const boqIndirectRelationshipsData: Data<
  NodeType,
  LinkType<NodeType>
> = {
  links: [
    {
      source: 'issues',
      target: 'boqFormula',
    },
    {
      source: 'comments',
      target: 'truView',
    },
  ],
  nodes: [
    {
      id: 'boqFormula',
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
      iconSvg: boq,
    },
    {
      id: 'truView',
      color:
        'transparent linear-gradient(0deg, #DA2615 0%, #FF6B55 100%) 0% 0% no-repeat padding-box',
      iconSvg: boq,
      shape: Shape.Rectangle,
    },
  ],
};
