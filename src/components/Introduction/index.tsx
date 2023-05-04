import React from 'react';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import embryo1 from './embryo_image_1.jpeg';
import embryo2 from './embryo_image_2.jpg';
import embryo3 from './embryo_image_3.jpeg';

const Introduction = () => (
  <>
    <Typography variant="subtitle1" gutterBottom>
      <b>Introduction to IMPC Embryo Data</b>
    </Typography>
    <hr />
    <Typography variant='body1' gutterBottom>
      Up to one third of homozygous knockout lines are lethal, which means no homozygous mice or less than expected
      are observed past the weaning stage (IMPC <a href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7">Viability Primary Screen procedure</a>).
      Early death may occur during embryonic development or soon after birth, during the pre-weaning stage.
      For this reason, the IMPC established a <a href="https://www.mousephenotype.org/impress">systematic embryonic phenotyping pipeline</a> to morphologically evaluate
      mutant embryos to ascertain the primary perturbations that cause early death and thus gain insight into gene function.
      <br /><br />
      As determined in IMPReSS (see interactive diagram <a href="https://www.mousephenotype.org/impress">here</a>), all embryonic lethal lines undergo gross morphology assessment
      at E12.5 (embryonic day 12.5) to determine whether defects occur earlier or later during embryonic development.
      A comprehensive imaging platform is then used to assess dysmorphology.
      Embryo gross morphology, as well as 2D and 3D imaging are actively being implemented by the IMPC for lethal lines.
      <br /><br />
      Read more in our paper on <a href="https://europepmc.org/article/PMC/5295821">High-throughput discovery of novel developmental phenotypes, Nature 2016.</a>
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      <b>Accessing Embryo Phenotype Data</b>
    </Typography>
    <hr />
    <Typography variant='body1' gutterBottom>
      Embryo phenotype data can be accessed in multiple ways:
      <br />
      <ul>
        <li>
          <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/landing_page_introduction.md#:~:text=Embryo%20Images%3A%20interactive%20heatmap">Embryo Images: interactive heatmap</a> A compilation of all our Embryo Images, organised by gene and life stage,
          with access to the Interactive Embryo Viewer, where you can compare mutants and wild types side by side
          and rotate 2D and 3D images; we also provide access to our external partners' embryo images.
        </li>
        <li>
          <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/data/embryo/vignettes">Embryo Vignettes</a> Showcase of best embryo images with detailed explanations.
        </li>
        <li>
          From the FTP site, latest release All our results.
          Reports need to be filtered by a dedicated column, Life Stage (E9.5, E12.5, E15.5 and E18.5).
          Please check the README file or see documentation <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/landing_page_introduction.md#:~:text=or%20see%20documentation-,here,-.">here</a>.
        </li>
        <li>
          Using the REST API (see documentation <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/landing_page_introduction.md#:~:text=API%20(see%20documentation-,here,-)">here</a>)
        </li>
      </ul>
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      <b>Determining Lethal Lines</b>
    </Typography>
    <hr />
    <Typography variant='body1' gutterBottom>
      The IMPC assesses each gene knockout line for viability (Viability Primary Screen <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/landing_page_introduction.md#:~:text=Viability%20Primary%20Screen-,IMPC_VIA_001,-).%20In%20this%20procedure">IMPC_VIA_001</a>).
      In this procedure, the proportion of homozygous pups is determined soon after birth, during the preweaning stage,
      in litters produced from mating heterozygous animals. A line is declared lethal if no homozygous pups
      for the null allele are detected at weaning age, and subviable if pups homozygous for the null allele
      constitute less than 12.5% of the litter.
      <br /><br />
      Lethal strains are further phenotyped in the <a href="https://www.mousephenotype.org/impress">embryonic phenotyping pipeline</a>.
      For embryonic lethal and subviable strains, heterozygotes are phenotyped in the IMPC <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/landing_page_introduction.md#:~:text=adult%20phenotyping%20pipeline">adult phenotyping pipeline</a>.
    </Typography>
    <ImageList cols={3} rowHeight={450} variant="woven">
      <ImageListItem>
        <img src={embryo1} loading="lazy" alt='' />
      </ImageListItem>
      <ImageListItem>
        <img src={embryo2} loading="lazy" alt='' />
      </ImageListItem>
      <ImageListItem>
        <img src={embryo3} loading="lazy" alt='' />
      </ImageListItem>
    </ImageList>
  </>
);

export default Introduction;
