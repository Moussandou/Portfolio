export async function render(){
  return `
  <section class="fade-in">
    <h1 class="section-title">Mon parcours</h1>
    <ul class="timeline">
      <li>
        <div class="time">2023 – 2028</div>
        <div class="content">
          <h3>Epitech – Marseille (Programme Grande École – Informatique)</h3>
          <p>Modules: C/C++, Shell, Systèmes, Réseaux, Web, Archi logicielle, Git, ASM.</p>
        </div>
      </li>
      <li>
        <div class="time">2020 – 2023</div>
        <div class="content">
          <h3>Baccalauréat Général</h3>
          <p>Spécialités: NSI, Anglais — Lycée Saint-Exupéry, Marseille.</p>
        </div>
      </li>
      <li>
        <div class="time">Mai – Sept. 2023</div>
        <div class="content">
          <h3>Équipier Polyvalent – Quick Grand Littoral</h3>
          <p>Cuisine, caisse, accueil, hygiène/qualité, stock, travail en équipe.</p>
        </div>
      </li>
      <li>
        <div class="time">Août – Nov. 2024</div>
        <div class="content">
          <h3>Stagiaire Développeur Web – Icom’Provence</h3>
          <p>CMS, WordPress, intégration, mise en ligne, collaboration associative.</p>
        </div>
      </li>
      <li>
        <div class="time">Mai 2025</div>
        <div class="content">
          <h3>Hackathon Agent AI – Hacktogone</h3>
          <p>Agents IA (n8n). Certif: bf1ccad0-62b9-4c5a-abf1-2c8ef6adacfd.</p>
        </div>
      </li>
    </ul>
  </section>`;
}
