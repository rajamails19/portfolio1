import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg-editor)',
      color: 'var(--text-primary)',
      fontFamily: 'BlinkMacSystemFont, "SF Pro Text", sans-serif',
      padding: '48px 20px',
    }}>
      <section style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/" style={{ color: 'var(--accent)', fontSize: 13, textDecoration: 'none' }}>← Back to Notes</Link>
        <h1 style={{ margin: '20px 0 8px', fontSize: 32, lineHeight: 1.15 }}>About & Privacy</h1>
        <p style={{ margin: '0 0 28px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          ABC Notes is a focused notes app for writing, organizing, and syncing your own notes.
        </p>

        <div style={{ display: 'grid', gap: 18 }}>
          <InfoBlock title="Your notes are private">
            Notes, folders, and image records are scoped to your signed-in account. The database uses Supabase row-level security so users can only access their own rows.
          </InfoBlock>
          <InfoBlock title="Where data is stored">
            Signed-in account data is stored in Supabase. Uploaded note images are stored in a private Supabase Storage bucket and loaded through authenticated app routes tied to your account.
          </InfoBlock>
          <InfoBlock title="Guest mode">
            Guest mode is for trying the app quickly. Guest notes are session-based and can be lost when you sign out, clear browser data, or switch devices.
          </InfoBlock>
          <InfoBlock title="Deleting notes and folders">
            Deleted notes move to Recently Deleted first. Permanent note deletes cannot be undone. Deleting a folder also deletes the notes inside that folder.
          </InfoBlock>
          <InfoBlock title="Account or data deletion">
            Until a self-serve account deletion tool is added, contact Raja from the portfolio site and include the email used for this app to request account/data removal.
          </InfoBlock>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
      <h2 style={{ margin: '0 0 6px', fontSize: 16 }}>{title}</h2>
      <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6, fontSize: 14 }}>{children}</p>
    </section>
  );
}
