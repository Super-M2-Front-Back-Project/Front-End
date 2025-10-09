"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/Components/header";
import Bouton from "@/Components/boutons";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <div className={styles.page}>
      <Toaster />
      <Header title="Bloop" />
      <Bouton label="Ajouter tous les prodiuts au panier" onClick={() => toast('Test')} />
    </div>
  );
}
