# Assets Bistrô1994 (camadas e recortes)

Estrutura (copiar para `public/` do projeto):

    burger/   4 camadas do hambúrguer (webp com transparência + png de fallback) + layers.json
    pizza/    pizza-calabresa e pizza-chocolate inteiras + 8 fatias de cada + pizza.json
    photos/   fotos originais convertidas pra webp (hero, galeria, cardápio)

## Hambúrguer (montagem no scroll)
- Todas as camadas têm o MESMO tamanho (903x739) e se encaixam em top:0 left:0 sem ajuste.
- Ordem de baixo pra cima: 01-pao-baixo, 02-alface-tomate, 03-hamburguer-cheddar, 04-pao-cima.
- Posição final = todas empilhadas em translateY(0). Pra animar, comece cada camada acima (translateY negativo) com opacity 0 e leve rotação.
- layers.json tem visibleTopY / visibleBottomY de cada camada se precisar de espaçamento.

## Pizza (montagem por fatias)
- pizza.json lista as 8 fatias com `saidaX`/`saidaY` (vetor unitário da direção de onde a fatia deve vir) e o tamanho do canvas.
- Todas as fatias de uma pizza têm o mesmo tamanho do canvas da pizza inteira: empilhe em position:absolute top:0 left:0.
- Animação: cada fatia começa deslocada (saidaX*300px, saidaY*300px) com opacity 0 e rotate(±25deg), e converge pra 0,0 conforme o scroll.
- Troque de pizza (calabresa -> chocolate) com crossfade ou segunda montagem.

## Observações
- Fotos são do restaurante: usadas com autorização do dono.
- Se quiserem camadas melhores (bacon, ovo etc.), fotografar cada ingrediente separado em fundo liso.
