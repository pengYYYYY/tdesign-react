import React, { useState } from 'react';
import { Cascader } from 'tdesign-react';

export default function Example() {
  const [value1, setValue1] = useState('');
  const options = [
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项一',
          value: '1.1',
        },
        {
          label: '子选项二',
          value: '1.2',
        },
        {
          label: '子选项三',
          value: '1.3',
        },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        {
          label: '子选项一',
          value: '2.1',
        },
        {
          label: '子选项二',
          value: '2.2',
        },
      ],
    },
  ];

  const onChange1 = (value) => {
    setValue1(value);
  };

  return <Cascader options={options} value={value1} showAllLevels={false} onChange={onChange1} />;
}
