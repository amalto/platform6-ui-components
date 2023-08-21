import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { default as classNames } from 'classnames';
import {
  compileWordings,
  isNotEmpty,
  downloadDataFile,
  base64Decode,
} from '@amalto/helpers';
import { ICON_TYPE, BUTTON_TYPE } from '@amalto/service-helpers';
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings';
import KeyValueEditor from '@amalto/key-value-editor';
import ButtonsBar from '@amalto/buttons-bar';
import { TreeNodeModel, OrgModel, KeyValDef } from './models/tree';

/**
 * Organize custom tree allowing you to manage nodes and attached data to it.
 * Attached data can be either texts or files.
 *
 * Tree uses [KeyValDef](#keyvaldev) interface and PdfViewer uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module Tree {
  export interface Props extends React.ClassAttributes<Tree> {
    /** Closing node event function */
    closeNode?: (id: string) => void;
    /**
     * Function to create a node.
     * Data update logic needs to be implemented based on the provided parameters.
     * See below for the required data model behind the <span className='quote'>KeyValDef</span> interface.
     * More details on [KeyValDef](#keyvaldef).
     */
    createNode?: (
      parentId: string,
      elementName: string,
      description: string,
      propertiesMap?: KeyValDef,
    ) => void;
    /** Data to render as a tree. More details on [TreeNodeModel](#treenodemodel). */
    data: TreeNodeModel;
    /** Set default selected node. */
    defaultSelectedNodeId?: string;
    /** Manage node deletion. */
    deleteNode?: (
      id: string,
      elementName: string,
      parentNodeId?: string,
    ) => void;
    /** Manage errors display. */
    displayEmptyValsError?: (emptyVals: string[]) => void;
    /** Manage node edition. */
    editNode?: (
      id: string,
      elementName: string,
      description: string,
      propertiesMap?: KeyValDef,
      parentNodeId?: string,
    ) => void;
    /** Already fetched */
    fetched?: string[];
    /** Fetch on expand */
    fetchNode?: (id: string) => Promise<void>;
    /** Any unique DOM ID. */
    id: string;
    /**
     * Language to use on the component. e.g: <span className='quote'>en-US</span>.
     * Locales available at [Locale](#locale).
     * Accessible via [WebStorage](#webstorage).
     */
    locale: string;
    /** Manage node selection. */
    selectCallback?: (node: TreeNodeModel) => void;

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<Tree>;
  }

  export interface State {
    treeInstance?: JSTree;
    selectedNode?: TreeNodeModel;
    formOpened?: string;
    editedNode?: OrgModel;
    wordings?: { [key: string]: string };
  }
}

class Tree extends React.Component<Tree.Props, Tree.State> {
  private _tree: HTMLDivElement = null;

  constructor(props: Tree.Props) {
    super(props);
    this.state = {
      treeInstance: null,
      selectedNode: null,
      formOpened: null,
      editedNode: null,
      wordings: compileWordings(MULTILANGUAGE_WORDINGS, props.locale),
    };
  }

  render() {
    const {
      children,
      createNode,
      deleteNode,
      displayEmptyValsError,
      editNode,
      id,
      locale,
    } = this.props;
    const { editedNode, formOpened, selectedNode, wordings } = this.state;

    const editButton =
      formOpened === 'EDIT' ? (
        <button
          type="button"
          className="btn btn-block btn-warning"
          onClick={this.editNode}
        >
          {wordings.treeUpdate}
        </button>
      ) : null;

    const createButton =
      formOpened === 'CREATE' ? (
        <button
          type="button"
          className="btn btn-block btn-success"
          onClick={this.createNode}
        >
          {wordings.validate}
        </button>
      ) : null;

    const canModifyTree =
      createNode && editNode && deleteNode && displayEmptyValsError;

    const cannotModifyNodeName =
      (formOpened !== 'CREATE' && selectedNode?.data?.parentId === '0') ||
      selectedNode?.data?.parentId === null;

    // Disable name input if can't edit it here
    const nodeForm =
      formOpened && canModifyTree ? (
        <div className="toggle-form bottom-margin">
          <div className="row">
            <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <label>{wordings.name}</label>
              <input
                type="text"
                className="form-control"
                value={editedNode.elementName}
                onChange={this.handleElementNameChange}
                disabled={cannotModifyNodeName}
              />
            </div>

            <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <label>{wordings.description}</label>
              <input
                type="text"
                className="form-control"
                value={editedNode.description}
                onChange={this.handleDescriptionChange}
              />
            </div>

            <div className="form-group col-xs-12 col-sm-6 col-md-4 col-lg-6">
              <label>{wordings.additionalProperties}</label>
              <KeyValueEditor
                handleChange={this.handlePropertiesChange}
                keyValues={editedNode.propertiesMap}
                locale={locale}
              />
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="top-margin">
                    {editButton}
                    {createButton}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null;

    const editor = (
      <div>
        <div className="row text-xs-center">
          <div className="col-xs-12">
            {canModifyTree ? this.renderTreeButtonsBar() : null}
          </div>
        </div>

        {nodeForm}
      </div>
    );

    const selectedNodeProperties = !$.isEmptyObject(
      selectedNode?.data?.propertiesMap,
    )
      ? Object.keys(selectedNode.data.propertiesMap).map((key) => {
          const nodeData = selectedNode.data as OrgModel;
          const { contentBytes, contentType } = nodeData.propertiesMap[key];
          const dataDisplay =
            contentType === 'text/plain' ? (
              <span className="inline-middle">{contentBytes}</span>
            ) : (
              <button
                type="button"
                className="inline-middle btn btn-xs btn-trans btn-info"
                data-key={key}
                onClick={this.downloadFile}
              >
                <span className="fas fa-download" />
              </button>
            );

          return (
            <li key={key}>
              <em className="right-spaced inline-middle">{key}</em>
              <span className="fas fa-long-arrow-alt-right right-spaced inline-middle" />
              {dataDisplay}
            </li>
          );
        })
      : null;

    const selectedDetails = selectedNode ? (
      <div className="top-margin toggle-form">
        <div className="row">
          <div className="col-xs-12">
            <h4 className="upper bottom-spaced">
              {wordings.selectedNodeDetails}
            </h4>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="text-small font-color-lighter">{wordings.name}</div>
            <div>{selectedNode.text}</div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="text-small font-color-lighter">{wordings.id}</div>
            <div className="word-wrap">
              <em>{selectedNode.id}</em>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="text-small font-color-lighter">
              {wordings.description}
            </div>
            <div>{selectedNode.data.description}</div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="text-small font-color-lighter">
              {wordings.properties}
            </div>
            {selectedNodeProperties ? (
              <ul className="basic-list margin-none">
                {selectedNodeProperties}
              </ul>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>
    ) : null;

    return (
      <div id={id} className="text-medium">
        <div className="tree-controls-container">{editor}</div>

        <div style={{ overflow: 'auto' }}>
          <div ref={(dom) => (this._tree = dom)} id={id} />
        </div>

        <div className="tree-details-container">
          {selectedDetails}
          {children}
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    const { data, defaultSelectedNodeId, id } = this.props;
    const { treeInstance } = this.state;

    if (data !== undefined && data !== null) {
      this.initTreeInstance({
        data,
        defaultSelectedNodeId,
        id,
        treeInstance,
      });
    }
  }

  componentWillReceiveProps(nextProps: Tree.Props) {
    const { data } = this.props;
    const { treeInstance } = this.state;

    if (data !== nextProps.data) {
      this.initTreeInstance({
        data: nextProps.data,
        defaultSelectedNodeId: nextProps.defaultSelectedNodeId,
        id: nextProps.id,
        treeInstance,
      });
    }
  }

  componentWillUnmount() {
    const { treeInstance } = this.state;

    treeInstance?.destroy();

    const treeContainer = ReactDOM.findDOMNode(this._tree) as HTMLElement;

    $(treeContainer).off();
  }

  private initTreeInstance = (params: {
    data: TreeNodeModel;
    defaultSelectedNodeId: string;
    id: string;
    treeInstance: JSTree;
  }): void => {
    const { data, defaultSelectedNodeId, id, treeInstance } = params;

    if (!treeInstance) {
      this.setState({
        treeInstance: this.setUpTree(id, data, defaultSelectedNodeId),
        selectedNode: null,
        editedNode: null,
        formOpened: null,
      });
    } else {
      treeInstance.settings.core.data = data;
      treeInstance.refresh(true);
    }
  };

  private renderTreeButtonsBar = (): JSX.Element | null => {
    const { selectedNode, wordings } = this.state;
    const disabled = !selectedNode;
    const expandAllBtn: ButtonsBar.BtnGroupsProps = {
      btns: [
        {
          cssClass: `${BUTTON_TYPE.GREEN} right-margin bottom-margin`,
          iconClass: 'fas fa-expand',
          text: wordings.expand,
          clickAction: this.expandAll,
          disabled,
        },
      ],
    };
    const collapeAllBtn: ButtonsBar.BtnGroupsProps = {
      btns: [
        {
          cssClass: `${BUTTON_TYPE.GREEN} right-margin bottom-margin`,
          iconClass: 'fas fa-compress',
          text: wordings.collapse,
          clickAction: this.collapseAll,
          disabled,
        },
      ],
    };
    const createBtn: ButtonsBar.BtnGroupsProps = {
      btns: [
        {
          cssClass: `${BUTTON_TYPE.GREEN} right-margin bottom-margin`,
          iconClass: ICON_TYPE.ADD,
          text: wordings.createChild,
          clickAction: this.openCreateForm,
          disabled,
        },
      ],
    };
    const editBtn: ButtonsBar.BtnGroupsProps = {
      btns: [
        {
          cssClass: `${BUTTON_TYPE.ORANGE} right-margin bottom-margin`,
          iconClass: ICON_TYPE.EDIT,
          text: wordings.edit,
          clickAction: this.openEditForm,
          disabled,
        },
      ],
    };
    const deleteBtn: ButtonsBar.BtnGroupsProps = {
      btns: [
        {
          cssClass: `${BUTTON_TYPE.RED} right-margin bottom-margin`,
          iconClass: ICON_TYPE.DELETE,
          text: wordings.delete,
          clickAction: this.deleteNode,
          disabled,
        },
      ],
    };
    const clearBtn: ButtonsBar.BtnGroupsProps = {
      btns: [
        {
          cssClass: classNames(
            `${BUTTON_TYPE.GREY} right-margin bottom-margin`,
            {
              hidden: !this.state.formOpened,
            },
          ),
          iconClass: ICON_TYPE.UNDO,
          text: wordings.cancel,
          clickAction: this.clearForm,
          disabled,
        },
      ],
    };

    return (
      <ButtonsBar
        btnGroups={[
          expandAllBtn,
          collapeAllBtn,
          createBtn,
          editBtn,
          deleteBtn,
          clearBtn,
        ]}
      />
    );
  };

  private downloadFile = (event: any) => {
    const { selectedNode } = this.state;

    if (selectedNode) {
      const keyValues: KeyValDef = selectedNode.data.propertiesMap;
      const key: string = event.currentTarget.getAttribute('data-key');

      downloadDataFile(
        keyValues[key].contentBytes,
        keyValues[key].contentType,
        key,
      );
    }
  };

  private expandAll = (event: React.SyntheticEvent<any>) => {
    const { selectedNode, treeInstance } = this.state;

    treeInstance?.open_all(selectedNode, 100);

    if (event) {
      $(event.currentTarget).blur();
    }
  };

  private collapseAll = (event: React.SyntheticEvent<any>) => {
    const { selectedNode, treeInstance } = this.state;

    treeInstance?.close_all(selectedNode, 100);

    if (event) {
      $(event.currentTarget).blur();
    }
  };

  private openCreateForm = () => {
    this.setState({
      formOpened: 'CREATE',
      editedNode: {
        parentId: this.state.selectedNode.id,
        elementName: '',
        description: '',
      },
    });
  };

  private createNode = () => {
    const { createNode, displayEmptyValsError } = this.props;
    const { editedNode, selectedNode, wordings } = this.state;

    let errors: string[] = [];
    if (isNotEmpty(editedNode.elementName)) {
      if (selectedNode.data.childNames.indexOf(editedNode.elementName) !== -1) {
        errors.push(wordings.invalidUniqueNodeName);
      }
    } else {
      errors.push(wordings.name);
    }

    if (!isNotEmpty(editedNode.description)) {
      errors.push(wordings.description);
    }

    for (const key in editedNode.propertiesMap) {
      if (!key) {
        errors.push(wordings.propertiesKey);
      }
    }

    if (errors.length > 0) {
      displayEmptyValsError(errors);
    } else {
      createNode(
        editedNode.parentId,
        editedNode.elementName.trim(),
        editedNode.description,
        editedNode.propertiesMap,
      );
      this.clearForm();
    }
  };

  private openEditForm = () => {
    const { selectedNode } = this.state;
    const { id, data, text } = selectedNode;

    this.setState({
      formOpened: 'EDIT',
      editedNode: {
        id,
        parentId: data.parentId,
        elementName: text,
        description: selectedNode.data?.description,
        propertiesMap: selectedNode.data?.propertiesMap,
      },
    });
  };

  private editNode = () => {
    const { displayEmptyValsError, editNode } = this.props;
    const { editedNode, wordings } = this.state;

    let errors: string[] = [];
    if (!isNotEmpty(editedNode.elementName)) {
      errors.push(wordings.name);
    }
    if (!isNotEmpty(editedNode.description)) {
      errors.push(wordings.description);
    }

    for (const key in editedNode.propertiesMap) {
      if (!key) {
        errors.push(wordings.propertiesKey);
      }
    }

    if (errors.length > 0) {
      displayEmptyValsError(errors);
    } else {
      editNode(
        editedNode.id,
        editedNode.elementName.trim(),
        editedNode.description,
        editedNode.propertiesMap,
        editedNode.parentId,
      );
      this.clearForm();
    }
  };

  private deleteNode = () => {
    const { selectedNode } = this.state;
    const { data, id, text } = selectedNode;

    this.props.deleteNode(id, text, data.parentId);
    this.clearForm();
  };

  private clearForm = () => {
    const { selectedNode, treeInstance } = this.state;

    treeInstance.deselect_node(selectedNode);
    this.setState({
      editedNode: null,
      formOpened: null,
      selectedNode: null,
    });
  };

  private handleElementNameChange = (event: any) => {
    const editedNodeUpdate: OrgModel = JSON.parse(
      JSON.stringify(this.state.editedNode),
    );

    editedNodeUpdate.elementName = event.target.value;

    this.setState({
      editedNode: editedNodeUpdate,
    });
  };

  private handleDescriptionChange = (event: any) => {
    const editedNodeUpdate: OrgModel = JSON.parse(
      JSON.stringify(this.state.editedNode),
    );

    editedNodeUpdate.description = event.target.value;

    this.setState({
      editedNode: editedNodeUpdate,
    });
  };

  private handlePropertiesChange = (keyValues?: KeyValDef) => {
    const editedNodeUpdate: OrgModel = JSON.parse(
      JSON.stringify(this.state.editedNode),
    );

    editedNodeUpdate.propertiesMap = keyValues;

    this.setState({
      editedNode: editedNodeUpdate,
    });
  };

  private setUpTree = (
    __id: string,
    data: TreeNodeModel,
    defaultSelectedNodeId?: string,
  ): JSTree => {
    const { closeNode, fetched, fetchNode, selectCallback } = this.props;
    let treeContainer = ReactDOM.findDOMNode(this._tree) as HTMLElement;

    let tree = $.jstree.create(treeContainer, {
      core: {
        data: data,
        check_callback: function (
          operation /**  node, node_parent, node_position, more */,
        ) {
          return operation !== 'move_node';
        },
        multiple: false,
        error: undefined,
      },
      plugins: ['sort'],
      sort: function (a: any, b: any) {
        return this.get_node(a).text.localeCompare(this.get_node(b).text) < 0
          ? -1
          : 1;
      },
    } as JSTreeStaticDefaults);

    tree.hide_dots();

    // FIXME: When another solution is provided by typescript than the double underscore, don't forget to make the changes
    // https://github.com/Microsoft/TypeScript/issues/9458
    $(treeContainer).on('select_node.jstree', (__event, selected) => {
      this.setState(
        {
          selectedNode: this.getDecodedNode(selected.node),
          editedNode: null,
          formOpened: null,
        },
        () => selectCallback?.(selected.node),
      );
    });

    $(treeContainer).on('deselect_node.jstree', (/** event, selected */) => {
      this.setState(
        {
          selectedNode: null,
          editedNode: null,
          formOpened: null,
        },
        () => selectCallback?.(null),
      );
    });

    $(treeContainer).on('open_node.jstree', (__event, selected) => {
      if (
        selected.node.parent !== '#' &&
        !fetched?.some((id) => id === selected.node.id)
      ) {
        fetchNode?.(selected.node.id);
      }
    });

    $(treeContainer).on('close_node.jstree', (__event, selected) => {
      closeNode?.(selected.node.id);
    });

    if (defaultSelectedNodeId) {
      setTimeout(() => {
        tree._open_to(defaultSelectedNodeId);
        tree.select_node(defaultSelectedNodeId);
      }, 500);
    }

    return tree;
  };

  private getDecodedNode = (node: TreeNodeModel): TreeNodeModel => {
    let convertedNode = JSON.parse(JSON.stringify(node)) as TreeNodeModel;

    if (!$.isEmptyObject(convertedNode?.data?.propertiesMap)) {
      let nodeKeyValues = JSON.parse(
        JSON.stringify(convertedNode.data.propertiesMap),
      ) as KeyValDef;

      for (const key in nodeKeyValues) {
        if (nodeKeyValues[key].contentType === 'text/plain') {
          nodeKeyValues[key].contentBytes = base64Decode(
            nodeKeyValues[key].contentBytes,
          );
        }
      }

      convertedNode.data.propertiesMap = nodeKeyValues;
    }

    return convertedNode;
  };
}

export default Tree;
