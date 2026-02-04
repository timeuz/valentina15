//  CONF
const DADOS = {
    meta: 4500.00,
    arrecadado: 500.00,
    dataNiver: '2026-02-15',
    chavePix: '00020126360014br.gov.bcb.pix0114+55799913264715204000053039865802BR5917Timeu F. Oliveira6009Sao Paulo62220518daqr7948329803383163042E72'
};

//  LÓGICA
function init() {
    const toMoney = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const partesData = DADOS.dataNiver.split('-');
    const niver = new Date(partesData[0], partesData[1] - 1, partesData[2]);

    const pct = Math.min((DADOS.arrecadado / DADOS.meta) * 100, 100);
    const diffTime = niver - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let msgTopo = "";
    if (diffDays > 0) {
        msgTopo = `⏳ Faltam ${diffDays} dias`;
    } else if (diffDays === 0) {
        msgTopo = `🎉 É HOJE! Parabéns!`;
    } else {
        msgTopo = `🥳 O prazo encerrou!`;
    }

    document.getElementById('val-current').innerText = toMoney(DADOS.arrecadado);
    document.getElementById('val-goal').innerText = toMoney(DADOS.meta);
    document.getElementById('percent-text').innerText = Math.floor(pct) + '%';
    document.getElementById('countdown-badge').innerText = msgTopo;
    document.getElementById('pix-raw').innerText = DADOS.chavePix;

    setTimeout(() => {
        document.getElementById('fill').style.width = pct + '%';
    }, 200);
}
function copyPix() {
    navigator.clipboard.writeText(DADOS.chavePix).then(() => {
        const btn = document.querySelector('.btn-action');
        const originalText = btn.innerHTML;

        btn.style.background = '#10B981';
        btn.innerHTML = '<span>✅ Copiado!</span>';

        setTimeout(() => {
            btn.style.background = 'var(--text-dark)';
            btn.innerHTML = originalText;
        }, 2000);
    }).catch(err => alert('Erro ao copiar. Tente selecionar manualmente.'));
}

init();
