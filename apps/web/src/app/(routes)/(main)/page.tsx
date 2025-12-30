"use client";

import Link from "next/link";
import { ArrowRight, Code2, PlayCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-background via-background to-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16 md:py-24">
        {/* Hero section */}
        <section className="grid gap-10 md:grid-cols-[3fr_2fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              LearnCode · Platform coding berbahasa Indonesia
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Kuasai pemrograman{" "}
              <span className="text-primary">dari nol sampai mahir</span>.
            </h1>
            <p className="max-w-xl text-muted-foreground text-sm md:text-base">
              Belajar pemrograman dalam bahasa Indonesia dengan kurikulum
              terstruktur, latihan interaktif, dan kode yang bisa langsung
              dijalankan di browser.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/courses">
                  Lihat Semua Kursus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="/login">Masuk / Daftar</Link>
              </Button>

              <p className="text-xs text-muted-foreground">
                Akses gratis untuk materi dasar. Tidak perlu kartu kredit.
              </p>
            </div>
          </div>

          {/* Highlight card */}
          <Card className="border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Belajar dengan kode asli
              </CardTitle>
              <CardDescription>
                Tulis, jalankan, dan uji kode langsung di dalam platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Setiap pelajaran dilengkapi penjelasan singkat, contoh kode, dan
                latihan yang bisa langsung kamu kerjakan.
              </p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Editor kode interaktif</li>
                <li>Test case otomatis untuk setiap latihan</li>
                <li>Progress belajar yang tersimpan</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Features section */}
        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <PlayCircle className="h-4 w-4 text-primary" />
                Belajar Terstruktur
              </CardTitle>
              <CardDescription>
                Modul dan lesson dari dasar sampai konsep lanjutan.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Ikuti alur belajar yang dirancang untuk pemula: mulai dari
              pemahaman dasar hingga problem solving dan algoritma.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Code2 className="h-4 w-4 text-primary" />
                Praktik Langsung
              </CardTitle>
              <CardDescription>
                Latihan langsung di browser dengan feedback instan.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Setiap latihan dicek dengan test case otomatis sehingga kamu tahu
              apakah solusi kamu sudah benar.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Admin & Analytics
              </CardTitle>
              <CardDescription>
                Kelola kursus, lesson, dan progress lewat dashboard admin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Untuk pengajar atau admin, kelola seluruh konten dan pantau
                performa siswa dari satu tempat.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin">Buka Admin Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;
