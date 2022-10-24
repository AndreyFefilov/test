declare namespace Autobim {
  export class DiffTool {
    static DIFFTOOL_PROGRESS_STATES: any;
  }

  export interface BIM360Model {
    name: string;
    guid: string;
    urn: string;
    discipline: string;
    isValid?: boolean;
    docGuid?: string;
    offsetZ?: number;
    ids?: number[];
    oidp_object_guid?: string;
    levels?: BIM360Model3DLevel[];
    instanceId?: string;
    location?: {
      x: number;
      y: number;
      z: number;
    };
    angle?: number;
    versionNum?: number;
  }

  export interface BIM360Model3DLevel {
    name: string;
    guid: string;
    elevation: number;
    height: number;
    extension: BIM360Model3DLevelExtension;
  }

  export interface BIM360Model3DLevelExtension {
    buildingStory: boolean;
    computationHeight: number;
    groundPlane: boolean;
    hasAssociatedViewPlans: boolean;
    structure: boolean;
  }

  export interface SectionBoxButton extends Autodesk.Viewing.UI.Button {
    container: HTMLDivElement;
    listeners: {
      click?: () => void;
    };
  }

  export namespace AEC {
    export class LevelsExtension extends Autodesk.AEC.LevelsExtension {
      levelsButton: Autobim.Viewing.UI.Button;
    }
  }

  export namespace Viewing {
    export namespace Extensions {
      export namespace Markups {
        class Core {
          [key: string]: any;
        }
      }
    }

    export class AggregatedView extends Autodesk.Viewing.AggregatedView {
      transformationMatrix: THREE.Matrix4;
      globalOffset: { x: number; y: number; z: number };
      options: Autodesk.Viewing.AggregatedViewInitOptions;
      waitForFirstModel?: any;
      refPoint?: any;
      diff?: any;
      diffCache?: any;
      onDiffDone?: any;
      diffNeedsUpdate?: boolean;
      levelsExtension?: any;
      modelItems?: any;
      viewer: GuiViewer3D;
      updateRefPoint?: (bubbleNode: BubbleNode) => void;
      unload: (bubbleNode: BubbleNode) => void;
      setDiffModels?: (diffModels: any, primaryModels: string | any[], supportModels: any) => void;
      _initForFirstViewable: (node: BubbleNode) => void;
      _showModel: (model: Model) => void;
      _unloadDiffTool: () => void;
      _updateDiffLoadProgress: () => void;
      _onModelLoaded: () => any;
      _onModelLoadFailed: (bubbleNode: any, errorCode: any) => void;
      _onError: (error?: any) => any;
      _loadExtension: (extension: string, config: any) => any;
      _onGlobalOffsetChanged: () => any;
      _updateModelTimestamps: () => any;
      _consolidateVisibleModels: () => any;
      _setDiff: (config: any) => any;
      getModel(node: BubbleNode): Model;
    }

    export interface AggregatedSelection {
      dbIdArray: number[];
      model: Viewing.Model;
      modelGuid?: string;
      modelInstanceId?: string;
      modelName: string;
      modelUrn: string;
      instanceId: string;
      elementId: string;
      intersectPoint: any;
      elementElevation: string;
      selection: number[];
    }

    export interface AggregatedEvent extends AggregatedSelection {
      selections?: AggregatedSelection[];
    }

    export interface AggregatedSelection {
      model: Viewing.Model;
      modelGuid?: string;
      modelInstanceId?: string;
      modelName: string;
      modelUrn: string;
      instanceId: string;
      elementId: string;
      intersectPoint: any;
      elementElevation: string;
    }

    export namespace Document {
      export interface AecModelData {
        version: string;
        documentId: string;
        phases: Phase[];
        levels: Level[];
        scopeBoxes: any[];
        refPointTransformation: number[];
        levelOccluderIds: number[];
        viewports: Viewport[];
        grids: Grid[];
        linkedDocuments: any[];
        locationParameters: LocationParameters;
      }
      export interface Grid {
        id: string;
        label: string;
        document: string;
        boundingBox: number[];
        segments: Segment[];
      }

      export interface Segment {
        type: number;
        guid: string;
        points: Points;
      }

      export interface Points {
        start: number[];
        end: number[];
      }

      export interface Level {
        guid: string;
        name: string;
        elevation: number;
        height: number;
        extension: Extension;
      }

      export interface LocationParameters {
        placeName: string;
      }

      export interface Phase {
        name: string;
      }

      export interface Viewport {
        isCropBoxActive: boolean;
        hasBreaks: boolean;
        sheetGuid: string;
        viewportGuid: string;
        viewGuid: string;
        viewType: ViewType;
        viewportRotation: number;
        scale: number;
        sectionBox: SectionBox;
        cameraOrientation: number[];
        viewportPosition: number[];
        geometryViewportRegion?: number[];
        modelToSheetTransform?: number[];
        extensions: Extensions;
      }

      export interface Extensions {
        viewRange?: ViewRange;
        hasRegions?: boolean;
        farClipOffsetActive: boolean;
        farClipOffset: number;
        elevationMarker?: number[];
        isSplitSection?: boolean;
        farClipping?: number;
      }

      export interface ViewRange {
        cutPlane: Plane;
        topClipPlane: Plane;
        bottomClipPlane: Plane;
        viewDepthPlane: Plane;
      }

      export interface Plane {
        levelGuid: string;
        offset: number;
      }

      export interface SectionBox {
        min: Coordinate;
        max: Coordinate;
        transform: number[];
      }

      export interface Coordinate {
        x: number;
        y: number;
        z: number;
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      export enum ViewType {
        Elevation = 'Elevation',
        FloorPlan = 'FloorPlan',
        Section = 'Section'
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    export class Extension extends Autodesk.Viewing.Extension {
      buildingStory: boolean;
      id: string;
      structure: boolean;
      viewer: GuiViewer3D;
      computationHeight: number;
      groundPlane: boolean;
      hasAssociatedViewPlans: boolean;
      replaceModels(diffModels: any, primaryModels: string | any[], supportModels: any): void;
    }

    export class Document extends Autodesk.Viewing.Document {
      target: BIM360Model;
      getRoot(): BubbleNode;
    }

    export class GuiViewer3D extends Autodesk.Viewing.GuiViewer3D {
      clickHandler: {
        handleSingleTap: (e: { canvasX: number; canvasY: number }) => void;
      };
      globalManager: any;
      impl: Viewer3DImpl;
      navigation: Navigation;
      navTools: Autodesk.Viewing.UI.RadioButtonGroup;
      utilities: ViewingUtilities;
      toolbar: Toolbar;
      fitToView(ids?: null | number[], model?: Model, immediate?: boolean): void;
      forEachExtension(callback: (ext: Extension) => void): void;
      getAllModels(): Model[];
      getVisibleModels(): Model[];
      getState(filter?: any): Autobim.Viewing.Private.ViewerState;
      loadExtension<T = any>(extensionId: string, options?: object): Promise<Extension>;
      registerContextMenuCallback(id: string, callback: (menu: ContextMenuItem[], status: any) => void): void;
      unlockSelection(ids?: number[], model?: Model): void;
      select(dbIds?: number[] | number, model?: Model, selectionType?: number): void;
      setProfile(profile: Profile): void;
    }

    export class Viewer3DImpl extends Autodesk.Viewing.Private.Viewer3DImpl {
      edgeColorMain: THREE.Vector4;
      consolidateModel(model: Autobim.Viewing.Model): void;
      hitTestViewport(vpVec: THREE.Vector3, ignoreTransparent: boolean): Autobim.Viewing.Private.HitTestResult;
      modelQueue(): ModelQueueData;
      removeModel(model: Autobim.Viewing.Model): void;
      unloadModel(model: Autobim.Viewing.Model): void;
    }

    export class Navigation extends Autodesk.Viewing.Navigation {
      setIsLocked(state: boolean): boolean;
    }

    export interface ViewingUtilities extends Autodesk.Viewing.ViewingUtilities {
      getHitPoint(x: number, y: number): THREE.Vector3;
      getBoundingBox(ignoreSelection?: boolean): THREE.Box3;
      setPivotPoint(newPivot: THREE.Vector3, preserveView: boolean, isset: boolean): void;
      goHome(): void;
    }

    export interface ContextMenuItem {
      title: string;
      target: () => void;
    }

    export class Toolbar extends Autodesk.Viewing.UI.ControlGroup {
      settingsTools: { [key: string]: Autobim.Viewing.UI.Button };
    }

    export interface ModelQueueData {
      budgetForTransparent: number;
      enableNonResumableFrames: any;

      addHiddenModel(e: any): void;
      addModel(e: any): void;
      areAll2D(): void;
      areAll3D(): void;
      areAllVisible(): void;
      explode(e: any): void;
      findHiddenModel(e: any): void;
      findModel(e: any): void;
      frameResumePossible(): void;
      frustum(): void;
      getAllModels(): void;
      getFragmentList(): void;
      getGeomScenes(): void;
      getGeomScenesPerModel(): void;
      getGeometryList(): void;
      getHiddenModels(): void;
      getModels(): Autobim.Viewing.Model[];
      getRenderProgress(): void;
      getSceneCount(): void;
      getVisibleBounds(e: any, t: any, n: any): void;
      hasHighlighted(): void;
      hideLines(e: any): void;
      hideModel(e: any): void;
      hidePoints(e: any): void;
      invalidateVisibleBounds(): void;
      isDone(): void;
      isEmpty(): void;
      needsRender(): void;
      rayIntersect(e: any, t: any, n: any, i: any, o: any, a: any, s: any, l: any): void;
      recomputeLinePrecision(): void;
      removeHiddenModel(e: any): void;
      removeModel(e: any): void;
      renderSome(e: any, n: any): void;
      reset(e: any, i: any, o: any, l: any): void;
      resetNeedsRender(): void;
      setAllVisibility(e: any): void;
      showModel(e: any): void;
      update(e: any): void;
    }

    export interface ProfileConfig {
      name: string;
      description?: string;
      label?: string;
      extensions: {
        load: string[];
        unload: string[];
      };
      settings?: Autodesk.Viewing.DefaultSettings;
      persistent?: string[];
    }

    export class Profile {
      constructor(config: ProfileConfig);
    }

    export interface ModelData {
      is2d: boolean;
      urn: string;
      instanceTree: Autodesk.Viewing.InstanceTree;
      loadOptions: {
        target: PropertyResult;
        bubbleNode: BubbleNode;
        instanceId: string;
      };
      dbIdFilter?: { [key: number]: number };
      bbox: {
        min: { x: number; y: number; z: number };
        max: { x: number; y: number; z: number };
      };
    }

    export class Model extends Autodesk.Viewing.Model {
      myData: ModelData;
      frags: {
        [key: string]: any[];
      };
      selector: {
        setSelection(dbId: number[], mode: Autodesk.Viewing.SelectionMode): void;
        clearNodeSelection(dbId: number): void;
        lockSelection(dbIds: number[], flag: boolean): void;
      };

      hasGeometry(): boolean;
      getData(): ModelData;
      getDocumentNode(): BubbleNode;
      getFragmentList(): Autobim.Viewing.Private.FragmentList;
      setPlacementTransform(transform: THREE.Matrix4): any;
      unconsolidate(): void;
    }

    export class BubbleNode extends Autodesk.Viewing.BubbleNode {
      doc2d: BubbleNode;
      target: Partial<BIM360Model>;
      findByGuid(guid: string): BubbleNode;
      getModelKey(): string;
      search(propsToMatch: Autodesk.Viewing.BubbleNodeSearchProps): BubbleNode[];

      _raw(): {
        type: string;
        role: string;
        outputType: string;
      };
    }

    export interface PropertyResult extends Autodesk.Viewing.PropertyResult {
      name: string;
      guid: string;
      urn: string;
      model: Viewing.Model;
      modelGuid: string;
      modelInstanceId?: string;
      modelName: string;
      modelUrn: string;
      instanceId: string;
      elementId: string;
      intersectPoint: THREE.Vector3;
      elementElevation: string;
      stateColor?: THREE.Vector4;
    }

    export interface ModelElement extends Autodesk.Viewing.PropertyResult {
      instanceId?: string;
      model?: Autobim.Viewing.Model;
      modelName: string;
      modelGuid: string;
      modelUrn: string;
      stateColor?: THREE.Vector4;
    }

    export class Selection {
      model: Model;
      dbIdArray: number[];
    }

    type EventAggregated = { selections: Selection[]; target: GuiViewer3D; type: string };

    export namespace UI {
      export class Button extends Autodesk.Viewing.UI.Button {
        container: HTMLElement;
        _toolTipElement: HTMLElement;
      }

      export class Tree extends Autodesk.Viewing.UI.Tree {
        destroy(): void;
        getSelection(): number[];
      }

      export class TreeDelegate extends Autodesk.Viewing.UI.TreeDelegate {
        getScrollContainer: () => HTMLElement;
        createTreeNode(node: any, parent: HTMLElement, options: object, type?: any, depth?: any): void;
        setGlobalManager(globalManager: any): void;
      }
    }

    namespace Private {
      export class ViewerState extends Autodesk.Viewing.Private.ViewerState {
        cutplanes: number[][];
        location: { x: number; y: number; z: number };
        listGuid2D: string;
        state: ViewerState;
        seedUrn: string;
      }

      export interface FragmentList extends Autodesk.Viewing.Private.FragmentList {
        getMaterial(id: number): THREE.MeshBasicMaterial;
        setMaterial(id: number, material: THREE.MeshBasicMaterial): void;
      }

      export interface HitTestResult {
        dbId: number;
        distance: number;
        face: THREE.Face3;
        faceIndex: number;
        fragId: number;
        intersectPoint: THREE.Vector3;
        model: Model;
        object: any;
        point: THREE.Vector3;
      }
    }
  }

  export namespace Extension {
    export class BoxSelection extends Autobim.Viewing.Extension {
      boxSelectionToolButton: Autodesk.Viewing.UI.Button;
      boxSelectionTool: Autodesk.Viewing.ToolInterface;
      setSelectionType(typeSelection: Autodesk.Viewing.SelectionMode): void;
    }

    export class Section extends Autobim.Viewing.Extension {
      sectionBoxButton: SectionBoxButton;
      tool: {
        isActive(): boolean;
        setSectionBox(box: THREE.Box3): void;
        getSectionBoxValues(): { sectionBox: number[] };
        handleSingleClick(pointer: { canvasX: number; canvasY: number }): void;
        handleMouseMove(pointer: { canvasX: number; canvasY: number }): void;
      };

      setSectionBox(box: THREE.Box3): void;
      setSectionPlane(normal: THREE.Vector3, targetPoint: THREE.Vector3): void;
    }
  }
}
