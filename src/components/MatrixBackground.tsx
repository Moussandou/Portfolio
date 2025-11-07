import { useEffect, useState } from 'react';

export function MatrixBackground() {
  const [matrixColumns, setMatrixColumns] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const createMatrixColumn = (index: number) => {
      const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]';
      const column = [];
      const height = Math.floor(Math.random() * 15) + 8;

      for (let i = 0; i < height; i++) {
        column.push(characters[Math.floor(Math.random() * characters.length)]);
      }

      return (
        <div
          key={index}
          className="matrix-text"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 8 + 10}s`
          }}
        >
          {column.join('\n')}
        </div>
      );
    };

    const columns = [];
    for (let i = 0; i < 80; i++) {
      columns.push(createMatrixColumn(i));
    }
    setMatrixColumns(columns);
  }, []);

  return (
    <div className="matrix-bg">
      {matrixColumns}
    </div>
  );
}