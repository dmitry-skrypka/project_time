import React from 'react';
import {
  Tag, Input, Tooltip, Icon,
} from 'antd';
import { connect } from 'react-redux';
import {
  getProfileInfo,
} from '../../actions/profilesActions';

class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);
    const { tags } = props.profile;
    this.state = {
      tags: JSON.parse(tags),
      inputVisible: false,
      inputValue: '',
    };
  }

  componentDidMount() {
    // const { tags } = this.props.profile;

  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { tags, inputVisible, inputValue } = this.state;


    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable
              afterClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" />
            {' '}
New Tag
          </Tag>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: (id) => {
    dispatch(getProfileInfo(id));
  },

});
const mapStateToProps = state => ({
  profile: state.profiles.selectedProfile,

});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableTagGroup);
