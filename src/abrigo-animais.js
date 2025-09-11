class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", favoritos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", favoritos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", favoritos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", favoritos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", favoritos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", favoritos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", favoritos: ["SKATE", "RATO"] },
    };

    this.todosBrinquedos = new Set([
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE",
    ]);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const pessoa1 = this.validarBrinquedos(brinquedosPessoa1);
      const pessoa2 = this.validarBrinquedos(brinquedosPessoa2);

      const ordem = ordemAnimais.split(",").map(a => a.trim());
      this.validarAnimais(ordem);

      let resultados = [];
      let adotados = { p1: 0, p2: 0 };

      for (const nome of ordem) {
        const animal = this.animais[nome];
        if (!animal) return { erro: "Animal inválido" };

        const p1Pode = this.verificaPreferencia(pessoa1, animal);
        const p2Pode = this.verificaPreferencia(pessoa2, animal);

        let destino = "abrigo";

        if (animal.tipo === "gato") {
          if (p1Pode && !p2Pode && adotados.p1 < 3) {
            destino = "pessoa 1";
            adotados.p1++;
          } else if (p2Pode && !p1Pode && adotados.p2 < 3) {
            destino = "pessoa 2";
            adotados.p2++;
          }
        } else if (nome === "Loco") {
          if (resultados.some(r => !r.includes("abrigo"))) {
            if (adotados.p1 < 3) {
              destino = "pessoa 1";
              adotados.p1++;
            } else if (adotados.p2 < 3) {
              destino = "pessoa 2";
              adotados.p2++;
            }
          }
        } else {
          if (p1Pode && !p2Pode && adotados.p1 < 3) {
            destino = "pessoa 1";
            adotados.p1++;
          } else if (p2Pode && !p1Pode && adotados.p2 < 3) {
            destino = "pessoa 2";
            adotados.p2++;
          } else if (p1Pode && p2Pode) {
            destino = "abrigo";
          }
        }

        resultados.push(`${nome} - ${destino}`);
      }

      return { lista: resultados.sort() };
    } catch (e) {
      return { erro: e.message };
    }
  }

  validarBrinquedos(brinquedosStr) {
    const brinquedos = brinquedosStr.split(",").map(b => b.trim());

    if (new Set(brinquedos).size !== brinquedos.length) {
      throw new Error("Brinquedo inválido");
    }

    for (const b of brinquedos) {
      if (!this.todosBrinquedos.has(b)) {
        throw new Error("Brinquedo inválido");
      }
    }

    return brinquedos;
  }

  validarAnimais(ordem) {
    if (new Set(ordem).size !== ordem.length) {
      throw new Error("Animal inválido");
    }

    for (const a of ordem) {
      if (!this.animais[a]) {
        throw new Error("Animal inválido");
      }
    }
  }

  verificaPreferencia(brinquedosPessoa, animal) {
    let idx = 0;

    for (const b of brinquedosPessoa) {
      if (b === animal.favoritos[idx]) {
        idx++;
        if (idx === animal.favoritos.length) return true;
      }
    }

    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };