export default function ListaTransacoes({ transacoes, onDelete, onEdit }) {
  return (
    <>
      {transacoes.map(t => (
        <div key={t.id} className="card">
          <div>
            <strong>{t.descricao}</strong>
            <p>R$ {t.valor}</p>
          </div>

          <div className="acoes">
            <button className="btn-editar" onClick={() => onEdit(t)}>
              Editar
            </button>

            <button className="btn-excluir" onClick={() => onDelete(t.id)}>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </>
  );
}