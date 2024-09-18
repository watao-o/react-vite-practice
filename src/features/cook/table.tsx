import { useMemo } from 'react';
import { 
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

// データの型定義
interface Person {
  recipeName: string;
  recipeLink: string;
  difficulty: number;
  ingredients: string;// 将来的にArray<Object>[{ 名称, 分量 }]にしたい
}

// テーブルに渡すデータ
const data: Person[] = [
  {
    recipeName: '鮭と玉ねぎの甘酢炒め',
    recipeLink: 'https://delishkitchen.tv/recipes/184131382333669734',
    difficulty: 1,
    ingredients: '玉ねぎ',
  },
  {
    recipeName: 'トリムね麻薬',
    recipeLink: 'https://youtube.com/shorts/M5TQTDXwKhg?si=T2dMx0KARzkCPP63',
    difficulty: 1,
    ingredients: '鶏むね肉',
  },
  {
    recipeName: '鳥モモ肉の照り焼き',
    recipeLink: 'https://www.google.com/url?sa=t&source=web&rct=j&url=https://delishkitchen.tv/recipes/118520140160565572&ved=2ahUKEwigkqCtqsv5AhXMGYgKHTJOCCoQrbMEegQIAxAV&usg=AOvVaw1TET2kh5nbVlzMj1pyCquy',
    difficulty: 2,
    ingredients: '鶏もも肉',
  },
];

export default function Table() {
  // カラムの定義
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      // keyを直接指定する場合
      {
        accessorKey: 'recipeName',
        header: '料理名',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHideng: false,
      },
      // keyを関数を使用して加工する場合
      {
        accessorFn: (originalRow) => String(originalRow.recipeLink),
        id: 'recipeLink',
        header: 'リンク',
        Header: <i style={{ color: 'red' }}>Age</i>,
        Cell: ({ cell }) => <i>{cell.getValue<string>().toLocaleString()}</i>,
      },
      {
        accessorKey: 'difficulty',
        header: '難易度',
        muiTableHeadCellProps: { style: { color: 'blue' } },
        enableHideng: false,
      },
      {
        accessorKey: 'ingredients',
        header: '材料',
        muiTableHeadCellProps: { style: { color: 'black' } },
        enableHideng: false,
      },
    ],
    [],
  );
  // テーブルの定義
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
  });

  // コンポーネントに定義したtableをpropsで渡す
  return <MaterialReactTable table={table} />;
}