export function CodeEditor() {
  const code = `entity User {
  id: UUID @primary
  username: String @unique
  email: String @unique
  createdAt: DateTime @default(now())

  orders: Order[]
}

entity Order {
  id: UUID @primary
  userId: UUID @foreign(User.id)
  status: OrderStatus
  total: Decimal
  createdAt: DateTime @default(now())

  user: User @relation
  items: OrderItem[]
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}`;

  const lines = code.split('\n');

  return (
    <div className="h-full flex flex-col" style={{ background: '#1E1E1E' }}>
      <div
        className="flex items-center px-4 border-b"
        style={{
          height: '35px',
          borderColor: '#3E3E42',
          background: '#252526'
        }}
      >
        <span className="text-[13px]" style={{ color: '#CCCCCC' }}>
          main.udl
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex">
          <div
            className="flex flex-col items-end px-2 select-none"
            style={{
              background: '#1E1E1E',
              color: '#858585',
              fontFamily: 'Fira Code, monospace',
              fontSize: '14px',
              lineHeight: '22.4px',
              paddingTop: '8px'
            }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <div
            className="flex-1 px-4 py-2"
            style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '14px',
              lineHeight: '22.4px',
              color: '#CCCCCC'
            }}
          >
            <pre className="m-0">
              <code>
                {lines.map((line, i) => {
                  const entityMatch = line.match(/^(entity|enum)\s+(\w+)/);
                  const propertyMatch = line.match(/^\s+(\w+):/);
                  const typeMatch = line.match(/:\s+(\w+)/);
                  const decoratorMatch = line.match(/@(\w+)/g);

                  return (
                    <div key={i}>
                      {entityMatch ? (
                        <>
                          <span style={{ color: '#569CD6' }}>{entityMatch[1]}</span>
                          {' '}
                          <span style={{ color: '#4EC9B0' }}>{entityMatch[2]}</span>
                          {line.slice(entityMatch[0].length)}
                        </>
                      ) : propertyMatch ? (
                        <>
                          {line.slice(0, propertyMatch.index)}
                          <span style={{ color: '#9CDCFE' }}>{propertyMatch[1]}</span>
                          {typeMatch && (
                            <>
                              {': '}
                              <span style={{ color: '#4EC9B0' }}>
                                {typeMatch[1]}
                              </span>
                            </>
                          )}
                          {decoratorMatch && line.includes('@') && (
                            <span style={{ color: '#C586C0' }}>
                              {line.slice(line.indexOf('@'))}
                            </span>
                          )}
                        </>
                      ) : decoratorMatch ? (
                        <span style={{ color: '#C586C0' }}>{line}</span>
                      ) : line.trim() === '' ? (
                        '\n'
                      ) : (
                        line
                      )}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
