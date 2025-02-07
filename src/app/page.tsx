'use client';
import { Button, TextInput, Group, Box } from '@mantine/core';
import { useState } from 'react';
import gridSettings from './settings.json';
import DynamicGrid, { ColumnSetting } from 'dynamic-grid';

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [queryParams, setQueryParams] = useState({
    keyword: ''
  });

  const handleSearch = () => {
    console.log(searchKeyword);
    setQueryParams(prev => ({
      ...prev,
      keyword: searchKeyword
    }));
  };

  return (
    <main style={{ padding: 20 }}>
      <Group mb="md">
        <TextInput
          placeholder="Arama yap..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <Button onClick={handleSearch}>Ara</Button>
      </Group>

     <Box style={{height: 'calc(100vh - 100px)'}}>
     <DynamicGrid
        baseUrl="http://localhost:3000"
        endpoint="/api/products"
        columnSettings={gridSettings as ColumnSetting[]}
        enableEdit={true}
        tokenRequired={false}
        pageSize={10}
        enableCheckbox={false}
        isMenuAction={true}
        queryParams={queryParams}
        onRowSelected={(selectedRows) => {
          console.log('Seçilen satırlar:', selectedRows);
        }}
        tableSettings={{
          highlightOnHover: false,
          withTableBorder: true,
          withColumnBorders: false
        }}
        onRowAction={(action, rowData) => {
          console.log(action, rowData);
        }}
      />
     </Box>
    </main>
  );
}