function abrirFormulario() {
    const formularioNovoMateria = document.getElementById('formularioNovoMateria');
    formularioNovoMateria.style.display = 'block';
  }
  
  function adicionarMateria() {
    const novaMateriaInput = document.getElementById('novaMateria');
    const novaMateria = novaMateriaInput.value;
  
    if (novaMateria) {
      const selectMaterias = document.getElementById('materias');
      const novaOpcao = document.createElement('option');
      novaOpcao.value = novaMateria;
      novaOpcao.text = novaMateria;
      selectMaterias.add(novaOpcao);
  
     
      novaMateriaInput.value = '';
      const formularioNovoMateria = document.getElementById('formularioNovoMateria');
      formularioNovoMateria.style.display = 'none';

        componentNotificacao.show({
            message: "Matéria cadastrada com sucesso!",
            cor: "green"
        });
    }
  }

function editarMateria() {
    const selectMaterias = document.getElementById('materias');
    const materiasSelecionadas = Array.from(selectMaterias.selectedOptions);
  
    if (materiasSelecionadas.length === 1) {
      const novaMateria = prompt('Digite o novo nome para a matéria:', materiasSelecionadas[0].value);
      if (novaMateria) {
        materiasSelecionadas[0].value = novaMateria;
        materiasSelecionadas[0].text = novaMateria;
      }
    } else {
        componentNotificacao.show({
            message: "Selecione ao menos uma matéria para editar",
            cor: "red"
        });
    }
  }
  
  function excluirMaterias() {
    const selectMaterias = document.getElementById('materias');
    const materiasSelecionadas = Array.from(selectMaterias.selectedOptions);
  
    if (materiasSelecionadas.length > 0) {
      materiasSelecionadas.forEach(opcao => {
        selectMaterias.remove(opcao.index);
      });
    } else {
        componentNotificacao.show({
            message: "Selecione ao menos uma matéria para excluir",
            cor: "red"
        });
    }
  }
  
  