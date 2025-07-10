export type V2FirstPool = {
  id: string;
  createdAt: string;
};

export type V2AssetAudit = {
  mint_authority_disabled: boolean | null;
  freeze_authority_disabled: boolean | null;
  high_single_ownership: boolean | null;
  permanent_control_enabled: boolean | null;
  top_holders_percentage: number | null;
  dev_migration_count: number | null;
};

export type V2AssetStats = {
  price_change: number;
  holder_change: number;
  liquidity_change: number;
  volume_change: number;
  buy_volume_usd: number;
  sell_volume_usd: number;
  buy_organic_volume_usd: number;
  sell_organic_volume_usd: number;
  buy_count: number;
  sell_count: number;
  trader_count: number;
  organic_buyer_count: number;
  net_buyer_count: number;
};

export type V2Asset = {
  mint: string;
  name: string;
  symbol: string;
  icon_url: string | null;
  decimals: number;
  twitter_url: string | null;
  website_url: string | null;
  dev_address: string | null;
  circulating_supply: number | null;
  total_supply: number | null;
  token_program_address: string;
  mint_authority_address: string | null;
  freeze_authority_address: string | null;
  launchpad: string | null;
  partner_config_address: string | null;
  first_pool: V2FirstPool | null;
  holder_count: number | null;
  audit: V2AssetAudit;
  tags: string[];
  cexes: string[];
  graduated_pool_id: string | null;
  graduated_at: string | null;
  fdv: number | null;
  market_cap: number | null;
  price_usd: number | null;
  price_block_id: number | null;
  liquidity: number | null;
  stats_5m: V2AssetStats;
  stats_1h: V2AssetStats;
  stats_6h: V2AssetStats;
  stats_24h: V2AssetStats;
};

export type V2Pool = {
  address: string;
  chain: string;
  dex: string;
  type: string;
  quote_asset_mint: string;
  created_at: string | null;
  liquidity: number | null;
  volume_24h: number;
  updated_at: string | null;
  base_asset: V2Asset;
};

export type V2AssetPrice = {
  asset_mint: string;
  block_id: number;
  price_usd: number;
};

export type V2Transaction = {
  pool_address: string;
  asset_mint: string;
  type: string;
  price_usd: number;
  volume_usd: number;
  volume_native: number;
  trader_address: string;
  signature: string;
  amount: number;
  is_mev: boolean;
  is_mrp: boolean;
  is_valid_price: boolean;
  timestamp: string;
};
