import React, { useState } from 'react';
import { InfiniteScroll } from 'yc-fish';
export default () => {
  const [list, setList] = useState(Array(12).fill(' '));
  const hasMore = true;
  const fetchMoreData = function() {
    console.log('fetchMoreData');
    setList(list => {
      return [].concat(list, Array(12).fill(' '));
    });
    console.log('list', list);
  };
  return (
    <InfiniteScroll
      className="scroll-container"
      dataLength={list.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p className="loading">加载中...</p>}
    >
      {list.map((it, idx) => {
        return (
          <p style={{ textAlign: 'center' }} key={idx}>
            这是列表{idx}
          </p>
        );
      })}
    </InfiniteScroll>
  );
};
