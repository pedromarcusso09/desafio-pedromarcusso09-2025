import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );

    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );

    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve lançar erro para brinquedo repetido", () => {
    expect(() =>
      new AbrigoAnimais().validarBrinquedos("RATO,RATO")
    ).toThrow("Brinquedo inválido");
  });

  test("Deve lançar erro para brinquedo inexistente", () => {
    expect(() =>
      new AbrigoAnimais().validarBrinquedos("FOGÃO")
    ).toThrow("Brinquedo inválido");
  });

  test("Deve lançar erro para animal repetido na ordem", () => {
    expect(() =>
      new AbrigoAnimais().validarAnimais(["Rex", "Rex"])
    ).toThrow("Animal inválido");
  });

  test("Deve lançar erro para animal inexistente na ordem", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "CAIXA,NOVELO",
      "Pikachu"
    );

    expect(resultado.erro).toBe("Animal inválido");
  });

  test("Se ambos podem adotar um gato, ele deve ir para o abrigo", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Zero"
    );

    expect(resultado.lista).toContain("Zero - abrigo");
  });

  test("Se só uma pessoa pode adotar um gato, ele deve ir para ela", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "LASER",
      "Zero"
    );

    expect(resultado.lista).toContain("Zero - pessoa 1");
  });

  test("Loco deve ficar no abrigo se for o primeiro", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "CAIXA,NOVELO",
      "Loco"
    );

    expect(resultado.lista).toContain("Loco - abrigo");
  });

  test("Loco deve ser adotado se já houver outro animal adotado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "CAIXA,NOVELO",
      "Rex,Loco"
    );

    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.lista).toContain("Loco - pessoa 1");
  });

  test("Se uma pessoa atingir o limite de 3 animais, o próximo deve ir para o abrigo", () => {
    const ordem = "Rex,Bebe,Bola,Fofo";
    const resultado = new AbrigoAnimais().encontraPessoas(
      "LASER,RATO,BOLA,CAIXA,NOVELO", 
      "LASER",
      ordem
    );

    const adotadosP1 = resultado.lista.filter(r => r.includes("pessoa 1"));

    expect(adotadosP1.length).toBe(3); 
    expect(resultado.lista).toContain("Fofo - abrigo");
  });

  test("Se ambos podem adotar um cão, ele deve ir para o abrigo", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );

    expect(resultado.lista).toContain("Rex - abrigo");
  });

  test("Se ninguém pode adotar um animal, ele deve ir para o abrigo", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA",
      "NOVELO",
      "Rex"
    );

    expect(resultado.lista).toContain("Rex - abrigo");
  });
});

