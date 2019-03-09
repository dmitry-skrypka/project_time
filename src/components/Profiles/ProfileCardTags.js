import React from 'react';
import { Tag, Tooltip } from 'antd';

function ProfileCardTags(props) {
  return (
    <div>
      {props.tags.map((tag) => {
        const isLongTag = tag.length > 5;
        const tagElem = (
          <Tag color="#42a5f5" key={tag}>
            {isLongTag ? `${tag.slice(0, 5)}...` : tag}
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
    </div>
  );
}

export default ProfileCardTags;
